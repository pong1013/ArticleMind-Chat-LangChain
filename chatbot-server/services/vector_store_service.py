from langchain_chroma.vectorstores import Chroma
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from config.open_ai import embeddings
import logging
import nltk

# 確保需要的 NLTK 資源已經下載, 為了讓embedding可以跑成功
# 強制指定 NLTK 資源的路徑
print(nltk.data.path)

nltk.data.path.append('/home/vscode/nltk_data')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

VECTOR_STORE_PATH = "./vector_store"
os.makedirs(VECTOR_STORE_PATH, exist_ok=True)

logger = logging.getLogger(__name__)

def load_vector_store():
    return Chroma(persist_directory=VECTOR_STORE_PATH, embedding_function=embeddings)

def merge_docs():
    path = "./docs/"
    md_files = []
    for subdir, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(subdir, file)
                md_files.append(filepath)

    md_files.sort()

    with open("all-doc.md", "w") as docs:
        for file_path in md_files:
            with open(file_path, "r") as file:
                docs.write(file.read())

    with open("all-doc.md") as f:
        content = f.read()

    modified_content = content.replace("\n\n\n\n\n\n", "\n")

    with open("all-doc.md", "w") as file:
        file.write(modified_content)

def create_embeddings():
    try:
        # 確保資源已經下載
        nltk.download('punkt')
        nltk.download('averaged_perceptron_tagger')
        # Load the documents
        loader = DirectoryLoader("./", glob="all-doc.md")
        documents = loader.load()

        # Split the documents into smaller chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=128)
        split_docs = text_splitter.split_documents(documents)

        logger.info(f"Loaded {len(split_docs)} chunks of text.")

        # Create embeddings and persist to the vector store
        docsearch = Chroma.from_documents(split_docs, embeddings, persist_directory=VECTOR_STORE_PATH)
        # docsearch.persist()

        logger.info("Embeddings created and stored successfully.")
    except Exception as e:
        logger.error(f"Error in create_embeddings: {e}")
        raise
