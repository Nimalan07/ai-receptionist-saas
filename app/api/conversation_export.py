from fastapi import APIRouter
from fastapi.responses import Response, FileResponse

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from app.database import SessionLocal

from app.models import (
    Conversation,
    Message
)

router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"]
)


# ==========================================
# TXT EXPORT
# ==========================================

@router.get(
    "/export/{conversation_id}"
)
def export_conversation(
    conversation_id: int
):

    db = SessionLocal()

    try:

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id
                == conversation_id
            )
            .first()
        )

        if not conversation:

            return {
                "error":
                "Conversation not found"
            }

        messages = (
            db.query(Message)
            .filter(
                Message.conversation_id
                == conversation_id
            )
            .order_by(
                Message.timestamp
            )
            .all()
        )

        content = f"""
Conversation ID:
{conversation.id}

Customer:
{conversation.customer_number}

Channel:
{conversation.channel}

Created:
{conversation.created_at}

=================================
"""

        for message in messages:

            content += f"""

{message.sender.upper()}
[{message.timestamp}]

{message.content}

---------------------------------
"""

        return Response(

            content=content,

            media_type="text/plain",

            headers={
                "Content-Disposition":
                f'attachment; filename="conversation_{conversation_id}.txt"'
            }
        )

    finally:

        db.close()


# ==========================================
# PDF EXPORT
# ==========================================

@router.get(
    "/export-pdf/{conversation_id}"
)
def export_conversation_pdf(
    conversation_id: int
):

    db = SessionLocal()

    try:

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id
                == conversation_id
            )
            .first()
        )

        if not conversation:

            return {
                "error":
                "Conversation not found"
            }

        messages = (
            db.query(Message)
            .filter(
                Message.conversation_id
                == conversation_id
            )
            .order_by(
                Message.timestamp
            )
            .all()
        )

        pdf_path = (
            f"conversation_{conversation_id}.pdf"
        )

        doc = SimpleDocTemplate(
            pdf_path
        )

        styles = getSampleStyleSheet()

        elements = []

        elements.append(
            Paragraph(
                f"Conversation #{conversation.id}",
                styles["Title"]
            )
        )

        elements.append(
            Spacer(1, 15)
        )

        elements.append(
            Paragraph(
                f"Customer: {conversation.customer_number}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Channel: {conversation.channel}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Created: {conversation.created_at}",
                styles["Normal"]
            )
        )

        elements.append(
            Spacer(1, 20)
        )

        for message in messages:

            elements.append(
                Paragraph(
                    f"<b>{message.sender.upper()}</b>",
                    styles["Heading3"]
                )
            )

            elements.append(
                Paragraph(
                    message.content,
                    styles["BodyText"]
                )
            )

            elements.append(
                Paragraph(
                    str(message.timestamp),
                    styles["Italic"]
                )
            )

            elements.append(
                Spacer(1, 10)
            )

        doc.build(elements)

        return FileResponse(

            path=pdf_path,

            media_type="application/pdf",

            filename=f"conversation_{conversation_id}.pdf"
        )

    finally:

        db.close()