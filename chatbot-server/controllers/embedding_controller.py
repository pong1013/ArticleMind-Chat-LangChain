from fastapi import APIRouter, HTTPException
from services.vector_store_service import create_embeddings

router = APIRouter()

@router.post("/create-embeddings")
async def create_embedding():
    try:
        create_embeddings()
        return {"message": "Embeddings created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating embeddings: {str(e)}")
