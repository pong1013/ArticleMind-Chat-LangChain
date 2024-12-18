from langchain_openai.chat_models import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the OpenAI API Key and model names from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL_NAME = os.getenv("OPENAI_MODEL")
EMBEDDING_MODEL_NAME = os.getenv("EMBEDDING_MODEL")
print(f"Using OpenAI Model: {OPENAI_MODEL_NAME}")
print(f"Using Embedding Model: {EMBEDDING_MODEL_NAME}")

# Load OpenAI models
chat_model = ChatOpenAI(
    temperature=0.2,
    openai_api_key=OPENAI_API_KEY,
    model_name=OPENAI_MODEL_NAME,
)

embeddings = OpenAIEmbeddings(
    openai_api_key=OPENAI_API_KEY,
    model=EMBEDDING_MODEL_NAME,
    request_timeout=60,
)
