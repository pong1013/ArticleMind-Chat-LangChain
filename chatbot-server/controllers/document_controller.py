from fastapi import APIRouter
from services.vector_store_service import merge_docs

router = APIRouter()

@router.post("/merge-docs")
async def merge_documents():
    try:
        merge_docs()
        return {"message": "Documents merged successfully"}
    except Exception as e:
        return {"error": str(e)}
