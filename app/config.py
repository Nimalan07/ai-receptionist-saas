from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
  
    DATABASE_URL = os.getenv("DATABASE_URL")
    WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
    WHATSAPP_PHONE_NUMBER_ID = os.getenv("WHATSAPP_PHONE_NUMBER_ID")
    WHATSAPP_VERIFY_TOKEN = os.getenv("WHATSAPP_VERIFY_TOKEN")
    OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")
settings = Settings()