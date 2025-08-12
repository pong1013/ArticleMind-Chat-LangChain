from fastapi import APIRouter
from controllers import chat, docs, embeddings

router = APIRouter()

# RESTful API endpoints
# Chat/QA endpoints
router.include_router(chat.router, prefix="/chat", tags=["Chat"])

# Document management endpoints
router.include_router(docs.router, prefix="/documents", tags=["Documents"])

# AI/ML endpoints
router.include_router(embeddings.router, prefix="/ai", tags=["AI Services"])
