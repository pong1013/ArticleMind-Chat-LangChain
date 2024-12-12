import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import styles from "./Login.module.css";

const Login = () => {
    console.log("Login Page Rendered");

  const handleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("User info:", decoded);

    // 儲存登入 token
    localStorage.setItem("token", response.credential);
    localStorage.setItem("userEmail", decoded.email);

    window.location.href = "/chatbot"; // 登入成功後跳轉
  };

  const handleLoginFailure = (error) => {
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
