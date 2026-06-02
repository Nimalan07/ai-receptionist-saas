from app.models import (
    Conversation,
    Message
)
from app.models import (
    KnowledgeSource
)
from sqlalchemy import func
from datetime import datetime, timedelta


# -----------------------------------
# CREATE OR GET CONVERSATION
# -----------------------------------

def get_or_create_conversation(
    db,
    customer_number,
    channel="whatsapp"
):

    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.customer_number == customer_number,
            Conversation.channel == channel
        )
        .first()
    )

    if not conversation:

        conversation = Conversation(
            customer_number=customer_number,
            channel=channel
        )

        db.add(conversation)

        db.commit()

        db.refresh(conversation)

    return conversation


# -----------------------------------
# SAVE MESSAGE
# -----------------------------------

def save_message(
    db,
    conversation_id,
    sender,
    content
):

    message = Message(
        conversation_id=conversation_id,
        sender=sender,
        content=content
    )

    db.add(message)

    db.commit()

    db.refresh(message)

    return message
def get_knowledge_source_by_name(
    db,
    source_name
):

    return (
        db.query(KnowledgeSource)
        .filter(
            KnowledgeSource.source_name == source_name
        )
        .first()
    )
def get_knowledge_source_by_id(

    db,

    source_id

):

    return (

        db.query(
            KnowledgeSource
        )

        .filter(
            KnowledgeSource.id == source_id
        )

        .first()
    )
def delete_knowledge_source(

    db,

    source

):

    db.delete(source)

    db.commit()
# -----------------------------------
# GET CONVERSATION HISTORY
# -----------------------------------

def get_conversation_history(
    db,
    conversation_id,
    limit=10
):

    messages = (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id
        )
        .order_by(Message.timestamp.desc())
        .limit(limit)
        .all()
    )

    return messages


# -----------------------------------
# GET ALL CONVERSATIONS
# -----------------------------------

def get_all_conversations(db):

    conversations = (
        db.query(Conversation)
        .order_by(
            Conversation.created_at.desc()
        )
        .all()
    )

    return conversations


# -----------------------------------
# GET MESSAGES BY CONVERSATION
# -----------------------------------

def get_messages_by_conversation(
    db,
    conversation_id
):

    messages = (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id
        )
        .order_by(Message.timestamp.asc())
        .all()
    )

    return messages
# -----------------------------------
# SAVE KNOWLEDGE SOURCE
# -----------------------------------

def save_knowledge_source(

    db,

    source_type,

    source_name,

    chunks_added
):

    source = KnowledgeSource(

        source_type=source_type,

        source_name=source_name,

        chunks_added=chunks_added
    )

    db.add(source)

    db.commit()

    db.refresh(source)

    return source


# -----------------------------------
# GET KNOWLEDGE SOURCES
# -----------------------------------

def get_knowledge_sources(db):

    return (

        db.query(KnowledgeSource)

        .order_by(
            KnowledgeSource.created_at.desc()
        )

        .all()
    )

# -----------------------------------
# BASIC ANALYTICS
# -----------------------------------

def get_analytics(db):

    total_conversations = (
        db.query(Conversation)
        .count()
    )

    total_messages = (
        db.query(Message)
        .count()
    )

    total_users = (
        db.query(
            Conversation.customer_number
        )
        .distinct()
        .count()
    )

    return {

        "total_conversations":
            total_conversations,

        "total_messages":
            total_messages,

        "total_users":
            total_users
    }

from app.models import Settings


# -----------------------------------
# GET SETTINGS
# -----------------------------------

def get_settings(db):

    settings = (
        db.query(Settings)
        .first()
    )

    if not settings:

        settings = Settings()

        db.add(settings)

        db.commit()

        db.refresh(settings)

    return settings


# -----------------------------------
# UPDATE SETTINGS
# -----------------------------------

def update_settings(

    db,

    company_name,
    assistant_name,
    welcome_message,
    auto_reply,
    dark_mode

):

    settings = get_settings(db)

    settings.company_name = (
        company_name
    )

    settings.assistant_name = (
        assistant_name
    )

    settings.welcome_message = (
        welcome_message
    )

    settings.auto_reply = (
        auto_reply
    )

    settings.dark_mode = (
        dark_mode
    )

    db.commit()

    db.refresh(settings)

    return settings
# -----------------------------------
# DAILY MESSAGE ANALYTICS
# -----------------------------------
def get_daily_message_stats(db):

    seven_days_ago = (
        datetime.utcnow() - timedelta(days=7)
    )

    results = (

        db.query(

            func.date(
                Message.timestamp
            ).label("date"),

            func.count(
                Message.id
            ).label("count")

        )

        .filter(
            Message.timestamp >= seven_days_ago
        )

        .group_by(
            func.date(Message.timestamp)
        )

        .order_by(
            func.date(Message.timestamp).asc()
        )

        .all()
    )

    return [

        {
            "date": str(r.date),
            "messages": r.count
        }

        for r in results
    ]