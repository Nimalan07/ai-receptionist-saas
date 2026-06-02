import requests
import re
import uuid

from bs4 import BeautifulSoup

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from app.services.embedding_service import (
    generate_embedding
)

from app.services.vector_service import (
    collection
)


# -----------------------------------
# PROCESS WEBSITE
# -----------------------------------

def process_website(url):

    # Fetch website
    response = requests.get(

        url,

        timeout=30,

        headers={

            "User-Agent":
                "Mozilla/5.0"
        }
    )

    response.raise_for_status()

    # Parse HTML
    soup = BeautifulSoup(

        response.text,

        "html.parser"
    )

    # Remove unwanted tags
    for tag in soup([

        "script",

        "style",

        "noscript",

        "header",

        "footer",

        "nav",

        "svg",

        "img",

        "aside"

    ]):

        tag.decompose()

    # Extract text
    text = soup.get_text(
        separator=" "
    )

    # Remove weird symbols
    text = re.sub(

        r'[^A-Za-z0-9.,!?()\-:/\s]',

        ' ',

        text
    )

    # Clean spacing
    text = " ".join(
        text.split()
    )

    print("WEBSITE TEXT LENGTH:")
    print(len(text))

    # Split into chunks
    splitter = (
        RecursiveCharacterTextSplitter(

            chunk_size=500,

            chunk_overlap=50
        )
    )

    chunks = splitter.split_text(
        text
    )

    print("TOTAL WEBSITE CHUNKS:")
    print(len(chunks))

    # Store in ChromaDB
    for chunk in chunks:

        embedding = generate_embedding(
            chunk
        )

        collection.add(

            documents=[chunk],

            embeddings=[embedding],

            ids=[
                str(uuid.uuid4())
            ],

            metadatas=[

    {
        "source": url,
        "type": "website",
        "priority": 1
    }
]
        )

    return len(chunks)