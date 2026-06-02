from fastapi import (

    APIRouter,

    HTTPException
)
from app.database import SessionLocal

from app.db.crud import (
    get_knowledge_source_by_name,
    save_knowledge_source
)
from pydantic import BaseModel

from app.services.web_scraper_service import (
    process_website
)


router = APIRouter(

    prefix="/web-ingestion",

    tags=["Web Ingestion"]
)


class WebsiteRequest(BaseModel):

    url: str


# -----------------------------------
# INGEST WEBSITE
# -----------------------------------

@router.post("/")
def ingest_website(

    request: WebsiteRequest

):

    db = SessionLocal()

    try:

        # Check duplicate URL first
        existing = get_knowledge_source_by_name(

            db,

            request.url
        )

        if existing:

            return {

                "message":
                    "Website already indexed",

                "url":
                    request.url
            }

        # Scrape website
        chunks_added = process_website(
            request.url
        )

        # Save knowledge source
        save_knowledge_source(

            db=db,

            source_type="website",

            source_name=request.url,

            chunks_added=chunks_added
        )

        return {

            "message":
                "Website ingested successfully",

            "url":
                request.url,

            "chunks_added":
                chunks_added
        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)
        )

    finally:

        db.close()
       