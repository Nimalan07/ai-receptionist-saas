from fastapi import APIRouter
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pandas as pd

from app.database import SessionLocal

from app.models import Message

from app.db.crud import (
    get_all_conversations,
    get_messages_by_conversation,
    get_analytics,
    get_daily_message_stats,
    get_settings,
    update_settings
)
class SettingsRequest(BaseModel):

    company_name: str

    assistant_name: str

    welcome_message: str

    auto_reply: bool

    dark_mode: bool
router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


# -----------------------------------
# GET ALL CONVERSATIONS
# -----------------------------------

@router.get("/conversations")
def fetch_conversations():

    db = SessionLocal()

    try:

        conversations = (
            get_all_conversations(db)
        )

        return {

            "total":
                len(conversations),

            "conversations": [

                {
                    "id": conv.id,

                    "customer_number":
                        conv.customer_number,

                    "channel":
                        conv.channel,

                    "created_at":
                        conv.created_at
                }

                for conv in conversations
            ]
        }

    finally:
        db.close()


# -----------------------------------
# GET MESSAGES
# -----------------------------------

@router.get(
    "/conversations/{conversation_id}/messages"
)
def fetch_messages(conversation_id: int):

    db = SessionLocal()

    try:

        messages = (
            get_messages_by_conversation(
                db,
                conversation_id
            )
        )

        return {

            "conversation_id":
                conversation_id,

            "total_messages":
                len(messages),

            "messages": [

                {
                    "id": msg.id,

                    "sender":
                        msg.sender,

                    "content":
                        msg.content,

                    "timestamp":
                        msg.timestamp
                }

                for msg in messages
            ]
        }

    finally:
        db.close()


# -----------------------------------
# GET ANALYTICS
# -----------------------------------

@router.get("/analytics")
def fetch_analytics():

    db = SessionLocal()

    try:

        analytics = (
            get_analytics(db)
        )

        return analytics

    finally:
        db.close()
# -----------------------------------
# GET SETTINGS
# -----------------------------------

@router.get("/settings")
def fetch_settings():

    db = SessionLocal()

    try:

        settings = get_settings(db)

        return {

    "company_name":
        settings.company_name,

    "assistant_name":
        settings.assistant_name,

    "welcome_message":
        settings.welcome_message,

    "auto_reply":
        settings.auto_reply,

    "dark_mode":
        settings.dark_mode
}

    finally:
        db.close()


# -----------------------------------
# UPDATE SETTINGS
# -----------------------------------
@router.post("/settings")
def save_settings(request: SettingsRequest):

    db = SessionLocal()

    try:

        settings = update_settings(

    db=db,

    company_name=
        request.company_name,

    assistant_name=
        request.assistant_name,

    welcome_message=
        request.welcome_message,

    auto_reply=
        request.auto_reply,

    dark_mode=
        request.dark_mode
)

        return {

            "message":
                "Settings updated successfully",

            "settings": {

    "company_name":
        settings.company_name,

    "assistant_name":
        settings.assistant_name,

    "welcome_message":
        settings.welcome_message,

    "auto_reply":
        settings.auto_reply,

    "dark_mode":
        settings.dark_mode
}
        }

    finally:
        db.close()
# -----------------------------------
# DAILY MESSAGE STATS
# -----------------------------------

@router.get("/daily-stats")
def fetch_daily_stats():

    db = SessionLocal()

    try:

        stats = (
            get_daily_message_stats(db)
        )

        return stats

    finally:
        db.close()

# -----------------------------------
# EXPORT MESSAGES
# -----------------------------------

@router.get("/export/messages")
def export_messages():

    db = SessionLocal()

    try:

        messages = (
            db.query(Message)
            .all()
        )

        data = []

        for msg in messages:

            data.append({

                "conversation_id":
                    msg.conversation_id,

                "sender":
                    msg.sender,

                "content":
                    msg.content,

                "timestamp":
                    msg.timestamp
            })

        df = pd.DataFrame(data)

        file_path = (
            "messages_report.xlsx"
        )

        df.to_excel(
            file_path,
            index=False
        )

        return FileResponse(
            path=file_path,
            filename=file_path,
            media_type=(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        )

    finally:
        db.close()