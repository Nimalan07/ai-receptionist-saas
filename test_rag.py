from app.services.rag_service import answer_question

question = "What is the fee for the Machine Learning course?"

response = answer_question(question)

print("\nAI Response:")
print(response)