from fastapi import APIRouter, HTTPException
from services.qa_service import get_answer
from pydantic import BaseModel

router = APIRouter()

chat_history = []

# 定義請求數據模型
class QuestionRequest(BaseModel):
    question: str

@router.post("/ask")
async def answer_question(request: QuestionRequest):
    try:
        question = request.question
        answer, updated_chat_history = get_answer(question, chat_history)
        chat_history.extend(updated_chat_history)
        return {"question": question, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")

@router.get("/clean-chat-history")
async def clean_chat_history():
    chat_history.clear()
    return {"message": "Chat history cleaned"}
