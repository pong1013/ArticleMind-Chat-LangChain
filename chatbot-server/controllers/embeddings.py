from fastapi import APIRouter, HTTPException
from services.vector import create_embeddings

router = APIRouter()

# POST /ai/embeddings - 創建嵌入向量
@router.post("/embeddings")
async def create_embedding():
    try:
        create_embeddings()
        return {"message": "Embeddings created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating embeddings: {str(e)}")
