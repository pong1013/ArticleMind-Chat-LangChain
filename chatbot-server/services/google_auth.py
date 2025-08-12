import requests
import json
import time
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from google.auth import jwt
import os
from dotenv import load_dotenv

load_dotenv()

class GoogleAuthService:
    def __init__(self):
        self.google_client_id = os.getenv("GOOGLE_CLIENT_ID", "778268524926-cpg2e7co0i5kiqhvfv44e04rtlpet0tv.apps.googleusercontent.com")
    
    def verify_google_token(self, token: str) -> dict:
        """
        驗證 Google ID Token 並返回用戶信息
        """
        try:
            # 使用 Google 的驗證服務驗證 ID Token
            idinfo = id_token.verify_oauth2_token(
                token, 
                google_requests.Request(), 
                self.google_client_id
            )
            
            # 檢查 Token 是否過期
            current_time = int(time.time())
            if idinfo['exp'] < current_time:
                raise ValueError('Token has expired')
            
            # 返回用戶信息
            return {
                'email': idinfo['email'],
                'name': idinfo.get('name', ''),
                'picture': idinfo.get('picture', ''),
                'verified_email': idinfo.get('email_verified', False)
            }
            
        except Exception as e:
            print(f"Google token verification failed: {str(e)}")
            raise ValueError(f"Invalid Google token: {str(e)}")
    
    def is_valid_user(self, email: str) -> bool:
        """
        檢查用戶是否有權限使用系統
        可以在這裡添加白名單或其他權限檢查邏輯
        """
        # 這裡可以添加您的權限檢查邏輯
        # 例如：只允許特定域名的郵箱
        # 或者：檢查用戶是否在白名單中
        
        # 目前允許所有通過 Google 驗證的用戶
        return True 