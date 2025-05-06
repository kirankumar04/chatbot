from flask import Flask, request, jsonify
import json
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer

# Load environment variables
load_dotenv()

# Supabase setup
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_API_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Embedding model
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

# Flask app
app = Flask(__name__)

# Function to store in Supabase
def store_in_supabase(text, source_name):
    doc_id = source_name
    embedding = embed_model.encode([text])[0].tolist()
    data = {
        "doc_id": doc_id,
        "text": text,
        "embedding": json.dumps(embedding)
    }
    supabase.table("documents").insert(data).execute()

# Upload endpoint
@app.route('/upload_txt', methods=['POST'])
def upload_txt_file_endpoint():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "File is required"}), 400

        uploaded_file = request.files['file']
        if uploaded_file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        if not uploaded_file.filename.endswith('.txt'):
            return jsonify({"error": "Only .txt files are allowed"}), 400

        text = uploaded_file.read().decode('utf-8')
        source_name = os.path.splitext(uploaded_file.filename)[0]
        store_in_supabase(text, source_name)

        return jsonify({"message": f"'{uploaded_file.filename}' uploaded and stored successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)