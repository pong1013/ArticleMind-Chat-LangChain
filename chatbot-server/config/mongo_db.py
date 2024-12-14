from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from models.qa_model import UserQuestion  # 确保导入的是正确的模型类
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

async def init_db():
    try:
        client = AsyncIOMotorClient(MONGO_URI)
        db = client[DATABASE_NAME]

        # 初始化 Beanie 模型
        await init_beanie(database=db, document_models=[UserQuestion])
        print("MongoDB initialized successfully!")
    except Exception as e:
        print(f"Error initializing MongoDB: {e}")
        raise e
