import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import styles from "./Login.module.css";

const Login = () => {
    console.log("Login Page Rendered");

    // 檢查是否已經登入
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("userEmail");
        console.log("Current localStorage state:", { token: !!token, userEmail: !!userEmail });
        
        if (token && userEmail) {
            console.log("Already logged in, redirecting to chatbot");
            window.location.href = "/chatbot";
        }
    }, []);

  const handleLoginSuccess = (response) => {
    try {
      console.log("=== LOGIN SUCCESS ===");
      console.log("Login response:", response);
      
      if (!response.credential) {
        console.error("No credential in response");
        return;
      }

      const decoded = jwtDecode(response.credential);
      console.log("Decoded user info:", decoded);

      // 驗證必要的用戶信息
      if (!decoded.email) {
        console.error("No email in decoded token");
        return;
      }

      // 儲存登入 token 和用戶信息
      localStorage.setItem("token", response.credential);
      localStorage.setItem("userEmail", decoded.email);
      
      console.log("=== STORAGE SUCCESS ===");
      console.log("Token and email stored successfully");
      console.log("Stored token length:", response.credential.length);
      console.log("Stored token preview:", response.credential.substring(0, 50) + "...");
      console.log("Stored email:", decoded.email);
      
      // 驗證儲存是否成功
      const storedToken = localStorage.getItem("token");
      const storedEmail = localStorage.getItem("userEmail");
      console.log("Verification - Stored token exists:", !!storedToken);
      console.log("Verification - Stored email exists:", !!storedEmail);

      // 登入成功後跳轉
      console.log("Redirecting to /chatbot...");
      window.location.href = "/chatbot";
    } catch (error) {
      console.error("Error processing login:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("=== LOGIN FAILURE ===");
    console.error("Login failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId="778268524926-cpg2e7co0i5kiqhvfv44e04rtlpet0tv.apps.googleusercontent.com">
      <div className={styles.login}>
        <h1>Welcome to Chien's ChatBot</h1>
        <p>Please login to continue</p>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
