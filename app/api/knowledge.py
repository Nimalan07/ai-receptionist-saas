from fastapi import (

    APIRouter,

    HTTPException
)

import os

from app.database import (
    SessionLocal
)

from app.db.crud import (

    get_knowledge_sources,

    get_knowledge_source_by_id
)
from app.db.crud import (
    delete_knowledge_source
)

from app.services.web_scraper_service import (
    process_website
)

from app.services.vector_service import (
    collection
)

router = APIRouter(

    prefix="/knowledge",

    tags=["Knowledge Base"]
)

UPLOAD_FOLDER = "uploads"


# -----------------------------------
# GET KNOWLEDGE SOURCES
# -----------------------------------

@router.get("/")
def get_knowledge():

    db = SessionLocal()

    try:

        sources = get_knowledge_sources(
            db
        )

        total_chunks = sum(

            s.chunks_added

            for s in sources
        )

        return {

            "total_sources":
                len(sources),

            "total_chunks":
                total_chunks,

            "sources": [

                {

                    "id":
                        source.id,

                    "source_type":
                        source.source_type,

                    "source_name":
                        source.source_name,

                    "chunks_added":
                        source.chunks_added,

                    "created_at":
                        source.created_at
                }

                for source in sources
            ]
        }

    finally:

        db.close()


# -----------------------------------
# DELETE KNOWLEDGE SOURCE
# -----------------------------------

@router.delete("/{source_id}")
def delete_knowledge(

    source_id: int

):

    db = SessionLocal()

    try:

        source = get_knowledge_source_by_id(

            db,

            source_id
        )

        if not source:

            raise HTTPException(

                status_code=404,

                detail="Source not found"
            )

        # Delete vectors from ChromaDB
        try:

            results = collection.get(

                where={

                    "source":
                        source.source_name
                }
            )

            if results.get("ids"):

                collection.delete(

                    ids=results["ids"]
                )

        except Exception as chroma_error:

            print(
                "Chroma delete error:",
                chroma_error
            )

        # Delete PDF file only
        if source.source_type == "pdf":

            file_path = os.path.join(

                UPLOAD_FOLDER,

                source.source_name
            )

            if os.path.exists(

                file_path
            ):

                os.remove(
                    file_path
                )

        # Delete PostgreSQL record
        db.delete(source)

        db.commit()

        return {

            "message":
                "Knowledge deleted successfully",

            "id":
                source_id
        }

    finally:

        db.close()

@router.post("/reindex/{source_id}")
def reindex_website(

    source_id: int

):

    db = SessionLocal()

    try:

        source = get_knowledge_source_by_id(

            db,

            source_id
        )

        if not source:

            raise HTTPException(

                status_code=404,

                detail="Source not found"
            )

        if source.source_type != "website":

            raise HTTPException(

                status_code=400,

                detail="Only websites can be re-indexed"
            )

        # Delete old vectors
        results = collection.get(

            where={

                "source":
                    source.source_name
            }
        )

        if results.get("ids"):

            collection.delete(

                ids=results["ids"]
            )

        # Re-scrape
        chunks_added = process_website(

            source.source_name
        )

        # Update chunk count
        source.chunks_added = chunks_added

        db.commit()

        return {

            "message":
                "Website re-indexed",

            "chunks_added":
                chunks_added
        }

    finally:

        db.close()