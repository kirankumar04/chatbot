from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Supabase and Gemini setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
genai.configure(api_key=GEMINI_API_KEY)
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

# Flask app
app = Flask(__name__)
CORS(app)

# Search in Supabase
def search_supabase(query, top_k=3):
    query_embedding = embed_model.encode([query]).tolist()[0]
    response = supabase.rpc("match_documents", {
        "query_embedding": query_embedding,
        "match_count": top_k
    }).execute()
    if response.data:
        return "\n".join([item["text"] for item in response.data])
    return "No relevant information found."

# Gemini response generation
def get_gemini_response(context, question):
    model = genai.GenerativeModel("gemini-1.5-pro")
    prompt = f"""
You are an AI assistant answering questions strictly based on the context below.

Context:
{context}

Question:
{question}

Answer with only the direct and most relevant phrase or term from the context.
Avoid any extra explanation, rephrasing, or complete sentences.
If the question is about general study tips, techniques, focus, learning — give concise advice relevant to studying.
If the question is completely unrelated to the context or studying, reply with: **"No relevant content found."
Give entire data about the question
"""
    response = model.generate_content(prompt)
    return response.text.strip()

# Ask question endpoint
@app.route('/ask_question', methods=['POST'])
def ask_question_endpoint():
    try:
        data = request.json
        question = data.get("question")
        if not question:
            return jsonify({"error": "No question provided"}), 400

        context = search_supabase(question)
        if context != "No relevant information found.":
            answer = get_gemini_response(context, question)
            return jsonify({"answer": answer}), 200
        else:
            return jsonify({"answer": "I don't have enough information.", "source": "No source available"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)