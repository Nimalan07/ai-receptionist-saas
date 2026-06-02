from fastapi import APIRouter

from app.database import SessionLocal

from app.db.crud import (
    get_knowledge_sources
)

router = APIRouter(

    prefix="/analytics",

    tags=["Analytics"]
)


@router.get("/")
def get_analytics():

    db = SessionLocal()

    try:

        sources = get_knowledge_sources(
            db
        )

        total_chunks = sum(

            source.chunks_added

            for source in sources
        )

        return {

    "total_sources":
        len(sources),

    "total_chunks":
        total_chunks,

    "ai_status":
        "Healthy",

    "recent_sources": [

        {

            "name":
                source.source_name,

            "type":
                source.source_type,

            "chunks":
                source.chunks_added

        }

        for source in sources[:5]
    ]
}
    finally:

        db.close()