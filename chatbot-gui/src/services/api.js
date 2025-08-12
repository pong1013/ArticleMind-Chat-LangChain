// API 服務 - 統一處理 API 調用和身份驗證

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please login again.");
  }
  
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const apiService = {
  // 聊天相關 API
  async sendMessage(question, userEmail) {
    try {
      const response = await fetch("/chat/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ question, user_email: userEmail })
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token 無效，清除本地存儲並重定向到登入頁面
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          window.location.href = "/login";
          throw new Error("Authentication failed. Please login again.");
        }
        throw new Error(`Request failed: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  async clearChatHistory() {
    try {
      const response = await fetch("/chat/", {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          window.location.href = "/login";
          throw new Error("Authentication failed. Please login again.");
        }
        throw new Error(`Request failed: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  async getUserStatus(userEmail) {
    try {
      const response = await fetch(`/chat/user/${userEmail}/status`, {
        method: "GET",
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          window.location.href = "/login";
          throw new Error("Authentication failed. Please login again.");
        }
        throw new Error(`Request failed: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
}; 