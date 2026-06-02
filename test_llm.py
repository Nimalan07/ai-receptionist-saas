from app.services.llm_service import generate_response

prompt = "Explain machine learning in one sentence."

response = generate_response(prompt)

print(response)