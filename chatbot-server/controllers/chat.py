from fastapi import APIRouter, HTTPException, Depends
from services.chat import get_answer
from pydantic import BaseModel
from models.user import UserQuestion
from datetime import datetime, timezone
from middleware.auth import verify_google_token


router = APIRouter()

chat_histories = {}

# 定義請求數據模型
class QuestionRequest(BaseModel):
    question: str
    user_email: str

# POST /chat - 發送問題並獲取回答
@router.post("/")
async def create_chat_message(
    request: QuestionRequest,
    user_info: dict = Depends(verify_google_token)
):
    try:
        # 驗證請求中的 email 與 token 中的 email 是否一致
        if request.user_email != user_info['email']:
            raise HTTPException(
                status_code=403,
                detail="Email mismatch with authentication token"
            )
        
        print(f"Received question from {request.user_email}: {request.question}")

        # Check 
        user_record = await UserQuestion.get_or_create_user_record(request.user_email)
        # check if admin
        if user_record.is_admin:
            remaining_questions = "Unlimited"
        else:
            # Check user record
            if not await user_record.increment_questions():
                raise HTTPException(
                    status_code=403,
                    detail="You have reached your daily question limit. Please try again tomorrow.",
                )
            
            remaining_questions = user_record.get_remaining_questions()

        # Get Chat History by user email
        if request.user_email not in chat_histories:
            chat_histories[request.user_email] =[]
        user_chat_history = chat_histories[request.user_email]
        
        # Get User Question
        question = request.question
        answer, updated_chat_history = get_answer(question, user_chat_history)
        chat_histories[request.user_email].extend(updated_chat_history)
        

        # 返回响应
        return {
            "question": question,
            "answer": answer,
            "remainingQuestions": remaining_questions,
            "isAdmin": user_record.is_admin
        }    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")

# DELETE /chat - 清除聊天歷史
@router.delete("/")
async def clear_chat_history(user_info: dict = Depends(verify_google_token)):
    chat_histories.clear()
    return {"message": "Chat history cleared"}

# GET /chat/user/{user_email}/status - 獲取用戶狀態
@router.get("/user/{user_email}/status")
async def get_user_status(
    user_email: str,
    user_info: dict = Depends(verify_google_token)
):
    try:
        # 驗證請求中的 email 與 token 中的 email 是否一致
        if user_email != user_info['email']:
            raise HTTPException(
                status_code=403,
                detail="Email mismatch with authentication token"
            )
        
        # 祝動獲取user record
        user_record = await UserQuestion.get_or_create_user_record(user_email)
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

        if user_record.is_admin:
            remaining_questions = "Unlimited"
        else:
            remaining_questions = 10 - user_record.questions_by_date.get(today, 0)

        return {
            "user_email": user_email,
            "remainingQuestions": remaining_questions,
            "isAdmin": user_record.is_admin
        }
    except Exception as e:
        print(f"Error fetching user status: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching user status.")
