📚 Interactive Chatbot for Educational Assistance
This is a full-stack AI chatbot application built using RAG (Retrieval-Augmented Generation) architecture. It leverages Google's Gemini API for advanced language generation and Supabase for vector-based semantic search. The app enables intelligent document-based question answering in an educational context.

🛠 Tech Stack
Frontend: React, Tailwind CSS

Backend: Python (FastAPI or Flask), Gemini API, Supabase

Database: Supabase PostgreSQL + pgvector extension

Architecture: Retrieval-Augmented Generation (RAG)

🚀 Getting Started
🔧 Frontend Setup
Navigate to the frontend directory:

cd chatbot

Install dependencies:

npm install

Run the development server (Frontend runs on http://localhost:5173):

npm run dev

🧠 Backend Setup
Navigate to the backend directory:

cd llm

Install Python dependencies:

pip install -r requirements.txt

Run the main backend server (API server runs on http://127.0.0.1:5000):

python app.py

Run the document upload script (runs on http://127.0.0.1:5001):

python upload.py

🗃 Supabase Vector DB Setup
Create a Supabase account and set up a new project.

In the SQL Editor, run:

CREATE EXTENSION vector;

CREATE TABLE documents (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
doc_id TEXT NOT NULL,
text TEXT NOT NULL,
embedding VECTOR(384) NOT NULL
);

CREATE INDEX IF NOT EXISTS documents_embedding_index
ON documents
USING ivfflat (embedding vector_cosine_ops);

CREATE OR REPLACE FUNCTION match_documents(query_embedding VECTOR(384), match_count INT)
RETURNS TABLE(text TEXT)
AS $$
BEGIN
RETURN QUERY
SELECT documents.text
FROM documents
ORDER BY documents.embedding <#> query_embedding
LIMIT match_count;
END;

$$
LANGUAGE plpgsql;

🔐 Environment Variables
Create a .env file inside the llm/ directory with the following content:


SUPABASE_URL=your_supabase_project_url
SUPABASE_API_KEY=your_supabase_api_key
GEMINI_API_KEY=your_gemini_api_key

Get your Gemini API Key here: https://ai.google.dev/gemini-api/docs/api-key

Sign up and create your Supabase project here: https://supabase.com/
$$
