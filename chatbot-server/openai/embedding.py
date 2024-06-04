from langchain.vectorstores import Chroma
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

from api import embeddings

loader = DirectoryLoader("./", glob="all-doc.md")
documents = loader.load()
print(f"documents:{len(documents)}")

# splitter
text_splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=30)
# split the document
split_docs = text_splitter.split_documents(documents)


# persistent data
docsearch = Chroma.from_documents(
    split_docs, embeddings, persist_directory="./vector_store"
)
docsearch.persist()
