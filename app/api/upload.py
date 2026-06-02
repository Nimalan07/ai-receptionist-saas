from fastapi import (

    APIRouter,

    UploadFile,

    File,

    HTTPException
)

import os
from app.database import SessionLocal

from app.db.crud import (
    save_knowledge_source
)
from app.services.pdf_service import (
    process_pdf
)

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


# -----------------------------------
# PDF UPLOAD
# -----------------------------------

@router.post("/pdf")
async def upload_pdf(

    file: UploadFile = File(...)

):

    # Validate file type
    if not file.filename.endswith(".pdf"):

        raise HTTPException(

            status_code=400,

            detail="Only PDF files allowed"
        )

    # Save file
    file_path = os.path.join(

        UPLOAD_FOLDER,

        file.filename
    )

    with open(file_path, "wb") as f:

        content = await file.read()

        f.write(content)

    # Process PDF
    chunks_added = process_pdf(
        file_path
    )
    db = SessionLocal()

    save_knowledge_source(

    db=db,

    source_type="pdf",

    source_name=file.filename,

    chunks_added=chunks_added
)

    db.close()

    return {

        "message":
            "PDF uploaded successfully",

        "filename":
            file.filename,

        "chunks_added":
            chunks_added
    }