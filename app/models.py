from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
    func
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database import Base


# -----------------------------------
# CONVERSATION
# -----------------------------------

class Conversation(Base):

    __tablename__ = "conversations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_number = Column(
        String,
        nullable=False
    )

    channel = Column(
        String,
        default="whatsapp"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    messages = relationship(
        "Message",
        back_populates="conversation"
    )


# -----------------------------------
# MESSAGE
# -----------------------------------

class Message(Base):

    __tablename__ = "messages"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    conversation_id = Column(
        Integer,
        ForeignKey("conversations.id")
    )

    sender = Column(String)

    content = Column(Text)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )

    conversation = relationship(
        "Conversation",
        back_populates="messages"
    )

class Settings(Base):

    __tablename__ = "settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    company_name = Column(
        String,
        default="CustomerAssist AI"
    )

    assistant_name = Column(
        String,
        default="CustomerAssist AI"
    )

    welcome_message = Column(
        Text,
        default="Hello! How can I help you today?"
    )

    auto_reply = Column(
        String,
        default="true"
    )

    dark_mode = Column(
        String,
        default="true"
    )
class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )

    role = Column(
        String,
        default="admin"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
from sqlalchemy import (

    Column,

    Integer,

    String,

    DateTime
)

from datetime import datetime


# -----------------------------------
# KNOWLEDGE SOURCES
# -----------------------------------

class KnowledgeSource(Base):

    __tablename__ = "knowledge_sources"

    id = Column(

        Integer,

        primary_key=True,

        index=True
    )

    source_type = Column(
        String
    )

    source_name = Column(
        String
    )

    chunks_added = Column(
        Integer
    )

    created_at = Column(

        DateTime,

        default=datetime.utcnow
    )
class CompanyFact(Base):

    __tablename__ = "company_facts"

    id = Column(
        Integer,
        primary_key=True
    )

    fact_key = Column(
        String,
        unique=True
    )

    fact_value = Column(
        Text
    )