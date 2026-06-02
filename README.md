# AI Receptionist SaaS Platform

An AI-powered customer support and reception platform built using FastAPI, Next.js, ChromaDB, and Ollama. The platform enables businesses to create intelligent assistants capable of answering customer queries using Retrieval-Augmented Generation (RAG), website knowledge ingestion, OCR-based PDF processing, and conversation management.

---

## Features

### AI Assistant

* Retrieval-Augmented Generation (RAG)
* Ollama-powered LLM responses
* Context-aware question answering
* Source attribution for responses
* Website-first retrieval strategy
* PDF fallback retrieval

### Knowledge Base

* Website ingestion and scraping
* PDF document upload
* OCR-based PDF processing
* ChromaDB vector storage
* Delete knowledge sources
* Re-index website sources
* Chunk statistics and source management

### Business Information

* CEO information
* Founder information
* Headquarters details
* Support contact information
* LinkedIn URL management
* Priority retrieval for company facts

### Conversation Management

* WhatsApp conversation storage
* Conversation history viewer
* Customer chat management
* Message tracking
* Conversation search

### Analytics Dashboard

* Knowledge source statistics
* Total chunk analytics
* AI health monitoring
* Activity visualization
* Recent knowledge activity tracking

### Export Features

* Export conversations as TXT
* Export conversations as PDF
* Download customer interaction history

---

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* Lucide Icons
* Axios

### Backend

* FastAPI
* SQLAlchemy
* SQLite

### AI & RAG

* Ollama
* ChromaDB
* Vector Embeddings
* Retrieval-Augmented Generation (RAG)

### Document Processing

* PyPDF
* Tesseract OCR
* pdf2image

---

## System Architecture
```text
User
  │
  v
Next.js Dashboard
  │
  v
FastAPI Backend
  │
  v
RAG Service
  │
  v
Embedding Service
  │
  v
ChromaDB Vector Store
  │
  v
Ollama LLM
```

---

## Project Structure

```text
AI-Receptionist-SaaS
│
├── app
│   ├── api
│   │   ├── analytics.py
│   │   ├── auth.py
│   │   ├── company_facts.py
│   │   ├── conversation_export.py
│   │   ├── dashboard.py
│   │   ├── knowledge.py
│   │   ├── playground.py
│   │   ├── upload.py
│   │   ├── web_ingestion.py
│   │   └── whatsapp.py
│   │
│   ├── auth
│   │   └── security.py
│   │
│   ├── db
│   │   └── crud.py
│   │
│   └── services
│       ├── embedding_service.py
│       ├── llm_service.py
│       ├── pdf_service.py
│       ├── rag_service.py
│       ├── vector_service.py
│       └── web_scraper_service.py
│
├── data
│   ├── chroma_db
│   └── raw
│
├── frontend
│   ├── app
│   │   ├── dashboard
│   │   │   ├── analytics
│   │   │   ├── company-facts
│   │   │   ├── conversations
│   │   │   ├── knowledge
│   │   │   ├── settings
│   │   │   └── upload
│   │   │
│   │   ├── login
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components
│   ├── hooks
│   ├── services
│   ├── public
│   └── ui
│
├── scripts
│   ├── create_tables.py
│   └── ingest_documents.py
│
├── tests
│   ├── test_db.py
│   ├── test_llm.py
│   ├── test_ollama.py
│   └── test_rag.py
│
├── uploads
│
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md

```


---

## Core Modules

### Knowledge Management

* Website ingestion
* OCR PDF ingestion
* Chunk generation
* Vector embedding creation
* ChromaDB storage

### AI Playground

* Ask questions against knowledge base
* Source-aware responses
* RAG retrieval pipeline

### Business Information

Stores important company information:

* CEO
* Founder
* Headquarters
* Support Email
* Phone Number
* LinkedIn URL

### Analytics

Provides:

* Total knowledge sources
* Total chunks
* AI health status
* Knowledge activity insights

### Conversations

Supports:

* WhatsApp chat storage
* Customer conversation history
* TXT export
* PDF export

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Nimalan07/ai-receptionist-saas.git

cd ai-receptionist-saas
```

### Backend Setup

```bash
python -m venv .venv

source .venv/bin/activate
```

Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create database:

```bash
python create_tables.py
```

Run backend:

```bash
uvicorn app.main:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file:

```env
# WhatsApp Cloud API
WHATSAPP_TOKEN=your_meta_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_VERIFY_TOKEN=your_webhook_verify_token

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/whatsapp_rag_db

# Ollama
OLLAMA_MODEL=your_llama_model_name

# Optional if using OpenAI
OPENAI_API_KEY=your_openai_api_key

# Optional if using Gemini
GOOGLE_API_KEY=your_google_api_key
```

---

## OCR Requirements

Install:

* Tesseract OCR
* Poppler

Update paths in:

```python
pdf_service.py
```

Example:

```python
pytesseract.pytesseract.tesseract_cmd

poppler_path
```

---

## Supported Knowledge Sources

### Website

* Company websites
* Service pages
* Knowledge pages

### Documents

* PDF documents
* OCR image-based PDFs
* Company brochures

---

## Future Improvements

* Unanswered question analytics
* Lead capture system
* Email integration
* Multi-tenant support
* User roles and permissions
* Live WhatsApp analytics
* Advanced conversation search
* CRM integrations

---

## Use Cases

* AI Receptionist
* Customer Support Assistant
* Company Knowledge Assistant
* Internal Helpdesk
* Website Support Chatbot
* WhatsApp Business Assistant

---

## License

This project is provided for educational and portfolio purposes.

---

## Author
##### NIMALAN MANI M
Developed using:

* FastAPI
* Next.js
* ChromaDB
* Ollama
* Retrieval-Augmented Generation (RAG)
