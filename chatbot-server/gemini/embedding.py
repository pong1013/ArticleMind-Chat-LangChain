from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

from api import embeddings

loader = DirectoryLoader("./", glob="all-doc.md")
documents = loader.load()
print(f"documents:{len(documents)}")

# splitter
text_splitter = RecursiveCharacterTextSplitter(chunk_size=50, chunk_overlap=5)
# split the document
split_docs = text_splitter.split_documents(documents)


# persistent data
docsearch = Chroma.from_documents(
    split_docs, embeddings, persist_directory="./vector_store"
)
