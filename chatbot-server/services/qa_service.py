from langchain.chains import ConversationalRetrievalChain
from services.vector_store_service import load_vector_store
from config.open_ai import chat_model
import logging

# 設置日誌
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


docsearch = load_vector_store()

# Initialize ConversationalRetrievalChain
qa_chain = ConversationalRetrievalChain.from_llm(chat_model, retriever=docsearch.as_retriever())

def get_answer(question: str, chat_history: list):
    try:
        logger.info(f"Received question: {question}")
        result = qa_chain({"question": question, "chat_history": chat_history})
        answer = result["answer"]
        logger.info(f"Generated answer: {answer}")
        return answer, [(question, answer)]
    except Exception as e:
        logger.error(f"Error in get_answer: {str(e)}")
        raise e
