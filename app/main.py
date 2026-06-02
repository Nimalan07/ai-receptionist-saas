from fastapi import FastAPI
from pydantic import BaseModel
from app.api.playground import router as playground_router
from app.api.whatsapp import router as whatsapp_router
from app.api.dashboard import router as dashboard_router
from app.api.upload import router as upload_router
from app.api.knowledge import router as knowledge_router
from app.services.rag_service import answer_question
from fastapi.middleware.cors import CORSMiddleware
from app.api.web_ingestion import router as web_ingestion_router
from app.api.auth import router as auth_router
from app.api.analytics import router as analytics_router
from app.api.company_facts import router as company_facts_router
from app.api.conversation_export import router as conversation_export_router
app = FastAPI(
    title="WhatsApp RAG Chatbot",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)
# -----------------------------------
# Request Model
# -----------------------------------

class AskRequest(BaseModel):
    question: str


# -----------------------------------
# Root Endpoint
# -----------------------------------

@app.get("/")
def root():

    return {
        "message": "WhatsApp RAG Chatbot API is running!"
    }


# -----------------------------------
# Ask Endpoint
# -----------------------------------

@app.post("/ask")
def ask(request: AskRequest):

    response = answer_question(
        request.question
    )

    return {
        "question": request.question,
        "answer": response
    }


# -----------------------------------
# Register Routers
# -----------------------------------

app.include_router(whatsapp_router)

app.include_router(dashboard_router)
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(knowledge_router)
app.include_router(web_ingestion_router)
app.include_router(playground_router)
app.include_router(analytics_router)
app.include_router(company_facts_router)
app.include_router(conversation_export_router)