from langchain_google_genai import (ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings, HarmBlockThreshold,
    HarmCategory)
from dotenv import load_dotenv
import os
load_dotenv()
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')

model = ChatGoogleGenerativeAI(model="gemini-1.5-pro-latest",
        safety_settings={
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        },)
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")