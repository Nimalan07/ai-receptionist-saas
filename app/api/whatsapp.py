from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import PlainTextResponse

import requests

from app.config import settings
from app.services.rag_service import answer_question

from app.database import SessionLocal

from app.db.crud import (
    get_or_create_conversation,
    save_message,
    get_conversation_history
)

router = APIRouter()


@router.get("/webhook")
async def verify_webhook(
    hub_mode: str = None,
    hub_verify_token: str = None,
    hub_challenge: str = None
):
    """
    Meta webhook verification endpoint.
    """

    if (
        hub_mode == "subscribe"
        and hub_verify_token == settings.WHATSAPP_VERIFY_TOKEN
    ):
        return PlainTextResponse(content=hub_challenge)

    raise HTTPException(
        status_code=403,
        detail="Verification failed"
    )


@router.post("/webhook")
async def receive_message(request: Request):

    db = SessionLocal()

    try:
        body = await request.json()

        message = (
            body["entry"][0]
            ["changes"][0]
            ["value"]["messages"][0]
            ["text"]["body"]
        )
        sender = (
            body["entry"][0]
            ["changes"][0]
            ["value"]["messages"][0]
            ["from"]
        )

        conversation = get_or_create_conversation(
            db=db,
            customer_number=sender,
            channel="whatsapp"
        )
        history_messages = get_conversation_history(
            db=db,
            conversation_id=conversation.id,
            limit=10
        )

        history_messages.reverse()

        chat_history = ""

        ignored_messages = [
            "hi",
            "hello",
            "thanks",
            "thank you",
            "ok",
            "okay"
        ]

        for msg in history_messages:

            lower_content = msg.content.lower().strip()

            # Skip low-value greetings
            if lower_content in ignored_messages:
                continue

            chat_history += (
                f"{msg.sender}: {msg.content}\n"
            )

        save_message(
            db=db,
            conversation_id=conversation.id,
            sender="user",
            content=message
        )

        reply = answer_question(
            user_question=message,
            chat_history=chat_history
        )

        save_message(
            db=db,
            conversation_id=conversation.id,
            sender="assistant",
            content=reply
        )


        url = (
            f"https://graph.facebook.com/v23.0/"
            f"{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
        )

        headers = {
            "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
            "Content-Type": "application/json",
        }

        payload = {
            "messaging_product": "whatsapp",
            "to": sender,
            "text": {
                "body": reply
            },
        }

        requests.post(
            url,
            headers=headers,
            json=payload,
            timeout=30
        )

        return {
            "status": "success"
        }

    except Exception as e:

        return {
            "status": "ignored",
            "error": str(e)
        }

    finally:
        db.close()