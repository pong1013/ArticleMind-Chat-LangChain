from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from services.google_auth import GoogleAuthService
from typing import Optional

security = HTTPBearer()
google_auth_service = GoogleAuthService()

async def verify_google_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    驗證 Google ID Token 的中間件
    """
    try:
        # 從 Authorization header 中提取 token
        token = credentials.credentials
        
        # 驗證 Google ID Token
        user_info = google_auth_service.verify_google_token(token)
        
        # 檢查用戶是否有權限
        if not google_auth_service.is_valid_user(user_info['email']):
            raise HTTPException(
                status_code=403, 
                detail="User not authorized to use this service"
            )
        
        return user_info
        
    except ValueError as e:
        raise HTTPException(
            status_code=401, 
            detail=f"Invalid authentication token: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=401, 
            detail="Authentication failed"
        ) 