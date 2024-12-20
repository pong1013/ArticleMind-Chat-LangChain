from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import routers
from config.mongo_db import init_db
import sys
import os
import asyncio

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Initial Database
async def lifespan(app: FastAPI):
    print("Starting up...")
    await init_db()  # 初始化 MongoDB
    yield
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 引入路由
app.include_router(routers.router)



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3035)
