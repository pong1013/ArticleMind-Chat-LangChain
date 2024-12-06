from fastapi import APIRouter
from controllers import qa_controller, document_controller, embedding_controller

router = APIRouter()

# Include individual routers
router.include_router(qa_controller.router, prefix="/qa", tags=["Question Answering"])
router.include_router(document_controller.router, prefix="/documents", tags=["Documents"])
router.include_router(embedding_controller.router, prefix="/embedding", tags=["Embedding"])
