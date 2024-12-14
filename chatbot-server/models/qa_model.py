from beanie import Document
from typing import Optional
from datetime import datetime, timezone

class UserQuestion(Document):
    user_email: str
    date: datetime
    questions_asked: int

    class Settings:
        collection = "UserQuestions"  # MongoDB collection
        
    @classmethod
    async def get_or_create_user_record(cls, user_email: str) -> "UserQuestion":
        today = datetime.now(timezone.utc).date()
        record = await cls.find_one({"user_email": user_email, "date": today})
        if not record:
            record = cls(user_email=user_email, date=today, questions_asked=0)
            await record.insert()
        return record

    async def increment_questions(self) -> bool:
        if self.questions_asked >= 10:
            return False  
        self.questions_asked += 1
        await self.save()
        return True