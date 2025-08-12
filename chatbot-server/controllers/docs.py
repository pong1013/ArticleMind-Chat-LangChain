from fastapi import APIRouter
from services.vector import merge_docs

router = APIRouter()

# POST /documents/merge - 合併文檔
@router.post("/merge")
async def merge_documents():
    try:
        merge_docs()
        return {"message": "Documents merged successfully"}
    except Exception as e:
        return {"error": str(e)}
