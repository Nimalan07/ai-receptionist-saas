from app.services.llm_service import (
    generate_response
)

from app.services.embedding_service import (
    generate_embedding
)

from app.services.vector_service import (
    collection
)


def answer_question(

    user_question: str,

    chat_history: str = ""

) -> str:

    # -----------------------------
    # Generate Query Embedding
    # -----------------------------

    query_embedding = generate_embedding(

        user_question
    )

    # -----------------------------
    # Search Website First
    # -----------------------------

    # -----------------------------
# Search Company Facts First
# -----------------------------

    facts_results = collection.query(

        query_embeddings=[
            query_embedding
        ],

        where={
            "type": "company_facts"
        },

        n_results=3,

        include=[
            "documents",
            "metadatas"
        ]
    )

    facts_docs = []

    if (
        facts_results.get(
            "documents"
        )
        and
        facts_results[
            "documents"
        ]
    ):

        facts_docs = (
            facts_results[
                "documents"
            ][0]
        )


# -----------------------------
# Search Website First
# -----------------------------

    website_results = collection.query(

        query_embeddings=[
            query_embedding
        ],

        where={
            "type": "website"
        },

        n_results=8,

        include=[
            "documents",
            "metadatas"
        ]
    )

    website_docs = []

    if (
        website_results.get(
            "documents"
        )
        and
        website_results[
            "documents"
        ]
    ):

        website_docs = (
            website_results[
                "documents"
            ][0]
        )
        
        website_meta = (
    website_results[
        "metadatas"
    ][0]
)

    # -----------------------------
    # Fallback To PDFs
    # -----------------------------
    if len(
        website_docs
    ) >= 3:

        documents = (
        facts_docs +
    website_docs
)

        metadata_list = (
    website_meta
)

        print(
            "\nUsing WEBSITE chunks"
        )

    else:

        pdf_results = collection.query(

            query_embeddings=[
                query_embedding
            ],

            where={
                "type": "pdf"
            },

            n_results=5,

            include=[
                "documents",
                "metadatas"
            ]
        )

        pdf_docs = []

        if (
            pdf_results.get(
                "documents"
            )
            and
            pdf_results[
                "documents"
            ]
        ):

            pdf_docs = (
                pdf_results[
                    "documents"
                ][0]
            )
            pdf_meta = (
    pdf_results[
        "metadatas"
    ][0]
)
        documents = (
            facts_docs +
            website_docs +
            pdf_docs
        )

        metadata_list = (
            website_meta +
            pdf_meta
        )

        print(
            "\nUsing WEBSITE + PDF chunks"
        )

    # -----------------------------
    # No Results
    # -----------------------------

    if not documents:

        return (
            "I couldn't find that information "
            "in the company knowledge base."
        )

    # -----------------------------
    # Debug Output
    # -----------------------------

    print(
        "\nQUESTION:"
    )

    print(
        user_question
    )

    print(
        "\nRETRIEVED CHUNKS:"
    )

    for i, doc in enumerate(

        documents[:5]

    ):

        print(
            f"\n--- CHUNK {i+1} ---"
        )

        print(
            doc[:1000]
        )

    # -----------------------------
    # Build Context
    # -----------------------------

    context = "\n\n".join(

        documents[:5]
    )

    # -----------------------------
    # Prompt
    # -----------------------------

    prompt = f"""
You are CustomerAssist AI, the official AI customer support assistant for  Software Solutions.

Your role is to answer customer questions ONLY using the provided company knowledge base and conversation history.

STRICT RULES:
1. Use ONLY the provided context and conversation history.
2. Do NOT use outside/general knowledge.
3. Do NOT invent information, assumptions, names, pricing, founders, policies, or technical explanations.
4. If the answer is not clearly available in the context, reply EXACTLY with:
"I couldn't find that information in the company knowledge base."
5. For technologies such as AI, ML, Python, Blockchain, Chatbots, IoT, Django, etc:
   - Explain them ONLY in the context of company services, projects, or solutions.
   - Avoid textbook definitions.
6. For greetings like "hi", "hello", and "thanks":
   - Reply warmly and professionally.
   - Keep greeting responses short.
7. Use conversation history to understand follow-up questions.
8. Keep all responses concise, professional, and business-focused.
9. Avoid repeating unnecessary information.
10. Do not generate overly long answers.

Conversation History:
{chat_history}

Company Knowledge Base Context:
{context}

Customer Question:
{user_question}

Answer:
"""

    response = generate_response(

        prompt
    )

    return {
    "answer": response,
    "sources": list(
        set(
            [
                meta.get(
                    "source",
                    "Unknown"
                )
                for meta in metadata_list
            ]
        )
    )
}
