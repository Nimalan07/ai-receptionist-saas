from fastapi import APIRouter

from pydantic import BaseModel

import uuid

from app.services.embedding_service import (
    generate_embedding
)

from app.services.vector_service import (
    collection
)

router = APIRouter(

    prefix="/company-facts",

    tags=["Company Facts"]
)


class CompanyFactsRequest(

    BaseModel
):

    ceo: str = ""

    founder: str = ""

    headquarters: str = ""

    support_email: str = ""

    phone: str = ""

    linkedin_url: str = ""


@router.post("/")
def save_company_facts(

    request: CompanyFactsRequest

):

    text = f"""

CEO: {request.ceo}

Founder: {request.founder}

Headquarters: {request.headquarters}

Support Email: {request.support_email}

Phone: {request.phone}

LinkedIn URL: {request.linkedin_url}

"""

    embedding = generate_embedding(
        text
    )

    collection.add(

        ids=[
            str(
                uuid.uuid4()
            )
        ],

        documents=[
            text
        ],

        embeddings=[
            embedding
        ],

        metadatas=[

            {

                "type":
                    "company_facts",

                "priority":
                    0
            }
        ]
    )

    return {

        "message":
            "Company facts saved"
    }