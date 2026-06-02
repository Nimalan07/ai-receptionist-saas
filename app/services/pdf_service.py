import os
import uuid

from pypdf import PdfReader

from pdf2image import convert_from_path
import pytesseract

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from app.services.embedding_service import (
    generate_embedding
)

from app.services.vector_service import (
    collection
)


def extract_with_pdfreader(

    file_path

):

    try:

        reader = PdfReader(
            file_path
        )

        text = ""

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:

                text += (
                    page_text + "\n"
                )

        return text

    except Exception as e:

        print(
            "PdfReader Error:",
            e
        )

        return ""


def extract_with_ocr(

    file_path

):

    images = convert_from_path(

        file_path,

        poppler_path=
        r"C:\poppler\Library\bin"
    )

    text = ""

    for image in images:

        page_text = (
            pytesseract.image_to_string(

                image,

                config="--psm 6"
            )
        )

        text += (
            page_text + "\n"
        )

    return text


def process_pdf(

    file_path

):

    print(
        "\n========== PDF ==========\n"
    )

    print(
        "FILE:"
    )

    print(
        file_path
    )

    # --------------------
    # Try PdfReader first
    # --------------------

    text = extract_with_pdfreader(

        file_path
    )

    if len(text.strip()) > 500:

        print(
            "Using PdfReader"
        )

    else:

        print(
            "Using OCR"
        )

        text = extract_with_ocr(

            file_path
        )

    print(
        "TEXT LENGTH:"
    )

    print(
        len(text)
    )

    if not text.strip():

        return 0

    # --------------------
    # Chunking
    # --------------------

    splitter = (
        RecursiveCharacterTextSplitter(

            chunk_size=1000,

            chunk_overlap=200
        )
    )

    chunks = splitter.split_text(
        text
    )

    print(
        "TOTAL CHUNKS:"
    )

    print(
        len(chunks)
    )

    # --------------------
    # Store in Chroma
    # --------------------

    filename = (
        os.path.basename(
            file_path
        )
    )

    for chunk in chunks:

        embedding = (
            generate_embedding(
                chunk
            )
        )

        collection.add(

            ids=[
                str(
                    uuid.uuid4()
                )
            ],

            documents=[
                chunk
            ],

            embeddings=[
                embedding
            ],

            metadatas=[

    {
        "source": filename,
        "type": "pdf",
        "priority": 2
    }
]
        )

    return len(chunks)