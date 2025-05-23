import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAm6k93OqfEdzXmJfitl0i-OkpXnnbfqY",
  authDomain: "pocs-pi2.firebaseapp.com",
  projectId: "pocs-pi2",
  storageBucket: "pocs-pi2.firebasestorage.app",
  messagingSenderId: "817648047285",
  appId: "1:817648047285:web:13c8d797351e1c55789afc",
  measurementId: "G-EB4ZZL466N"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backendResponse, setBackendResponse] = useState("");

  async function handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const response = await fetch("http://localhost:8080/api/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await response.text();
      setBackendResponse(data);
    } catch (error) {
      setBackendResponse("Erro: " + error.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Login Firebase + Backend</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
      />
      <button onClick={handleLogin} style={{ padding: "10px 20px" }}>Login & Chamar Backend</button>
      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{backendResponse}</pre>
    </div>
  );
}

export default App;
