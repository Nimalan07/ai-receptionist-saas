from fastapi import (

    APIRouter,

    HTTPException
)

from pydantic import BaseModel

from app.services.rag_service import (
    answer_question
)

router = APIRouter(

    prefix="/playground",

    tags=["AI Playground"]
)


class PlaygroundRequest(BaseModel):

    question: str


# -----------------------------------
# AI PLAYGROUND CHAT
# -----------------------------------

@router.post("/chat")
def playground_chat(

    request: PlaygroundRequest

):

    try:

        result = answer_question(
    request.question
)

        return {

            "question":
                request.question,

            "answer":
                result["answer"],

            "sources":
                result["sources"]
        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)
        )