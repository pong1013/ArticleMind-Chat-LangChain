from beanie import Document
from typing import Dict
from datetime import datetime, timezone
from pymongo.errors import DuplicateKeyError
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()
ADMIN_USER = os.getenv("ADMIN_USER")

class UserQuestion(Document):
    user_email: str
    questions_by_date: Dict[str, int] = {}
    is_admin: bool = False # Default not admin

    class Settings:
        collection = "UserQuestions"  # MongoDB collection

        
    @classmethod
    async def get_or_create_user_record(cls, user_email: str) -> "UserQuestion":
        try:
            record = await cls.find_one({"user_email": user_email})
            if not record:
                is_admin = (user_email == ADMIN_USER)
                record = cls(user_email=user_email, questions_by_date={}, is_admin=is_admin)
                await record.insert()
            return record
        except DuplicateKeyError:
            # 如果重複寫入則找到該筆多餘資料
            return await cls.find_one({"user_email": user_email})

    async def increment_questions(self) -> bool:
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        if not self.is_admin:
            if self.questions_by_date.get(today,0) >= 10:
                return False  
            self.questions_by_date[today] = self.questions_by_date.get(today, 0) + 1
        await self.save()
        return True
    
    def get_remaining_questions(self) -> int:
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        return 10 - self.questions_by_date.get(today, 0) if not self.is_admin else float("inf")
