import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  loginWithEmail,
  registerOrLoginWithGoogle,
} from "../../contexts/features/authSlice";
import { addAlert } from "../../contexts/features/alertSlice";
import "./LoginStyles.css";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginWithEmail(email, password, remember));
      dispatch(
        addAlert({
          id: new Date().toISOString(),
          message: "Inicio de sesión exitoso",
          type: "success",
        })
      );
      navigate("/organizacion");
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      dispatch(
        addAlert({
          id: new Date().toISOString(),
          message: "Error durante el inicio de sesión",
          type: "error",
        })
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await dispatch(registerOrLoginWithGoogle());
      dispatch(
        addAlert({
          id: new Date().toISOString(),
          message: "Inicio de sesión con Google exitoso",
          type: "success",
        })
      );
      navigate("/organizacion");
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
      dispatch(
        addAlert({
          id: new Date().toISOString(),
          message: "Error durante el inicio de sesión con Google",
          type: "error",
        })
      );
    }
  };

  return (
    <div>
      <div className="container">
        <div className="firstColumn">
          <h1>Ingresa a FormuApp</h1>

          <form action="" className="form" onSubmit={handleEmailLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <small>Olvidaste tu contraseña</small>
            <div className="rememberPassword">
              <input
                type="checkbox"
                name="rememberPassword"
                id="rememberPassword"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="rememberPassword">Recordar contraseña</label>
            </div>
            <div>
              <button type="submit" className="loginButton">
                Iniciar Sesión
              </button>
              <p style={{ marginTop: "10px" }}>
                ¿No tienes una cuenta?
                <span style={{ color: "#F65232" }}>
                  {" "}
                  <Link to={"/register"}>Registrate</Link>
                </span>
              </p>
            </div>
          </form>
          <hr
            style={{
              color: "white",
              border: "1px solid #f1f1f1",
              width: "80%",
              margin: "20px auto",
            }}
          />
          <div className="GoogleButton" onClick={handleGoogleLogin}>
            <img
              src="/img/icons/google-icon.webp"
              alt="Logo Google"
              width={20}
              style={{ marginRight: "10px" }}
            />
            <p>Login con Google</p>
          </div>
        </div>
        <div className="secondColumn">
          <h1>Hacer tus documentos nunca fue tan fácil!</h1>
          <p>
            Crea y automatiza la creación de documentos, sube tus propias
            plantillas o busca en nuestra biblioteca para automatizar tus
            documentos en un click.
          </p>
          <button>¿Como funciona?</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
