from fastapi import APIRouter, HTTPException
from services.qa_service import get_answer
from pydantic import BaseModel
from models.qa_model import UserQuestion
from datetime import datetime, timezone


router = APIRouter()

chat_history = []

# 定義請求數據模型
class QuestionRequest(BaseModel):
    question: str
    user_email: str

@router.post("/ask")
async def answer_question(request: QuestionRequest):
    try:
        # Check 
        user_record = await UserQuestion.get_or_create_user_record(request.user_email)

         # Check user record
        if not await user_record.increment_questions():
            raise HTTPException(
                status_code=403,
                detail="You have reached your daily question limit. Please try again tomorrow.",
            )

        # Get User Question
        question = request.question
        answer, updated_chat_history = get_answer(question, chat_history)
        chat_history.extend(updated_chat_history)
        
        remaining_questions = 10 - user_record.questions_asked

        # 返回响应
        return {
            "question": question,
            "answer": answer,
            "remainingQuestions": remaining_questions,
        }    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")

@router.get("/clean-chat-history")
async def clean_chat_history():
    chat_history.clear()
    return {"message": "Chat history cleaned"}
