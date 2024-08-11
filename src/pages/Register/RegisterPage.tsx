import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../contexts/hooks";
import { Link } from "react-router-dom";
import {
  registerWithEmail,
  registerOrLoginWithGoogle,
} from "../../services/auth/authService";
import { addAlert } from "../../contexts/features/alertSlice";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        registerWithEmail(email, password, firstName, lastName, true)
      );
      dispatch(
        addAlert({
          id: new Date().toISOString(),
          message: "Registro exitoso",
          type: "success",
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      dispatch(
        addAlert({
          id: new Date().toISOString(),
          message: "Error durante el registro",
          type: "error",
        })
      );
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await dispatch(registerOrLoginWithGoogle());
      dispatch(
        addAlert({
          id: new Date().toISOString(),
          message: "Registro con Google exitoso",
          type: "success",
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Error durante Google registration:", error);
      dispatch(
        addAlert({
          id: new Date().toISOString(),
          message: "Error durante el registro con Google",
          type: "error",
        })
      );
    }
  };

  return (
    <div>
      <div className="container">
        <div className="firstColumn">
          <h1 style={{ marginBottom: "50px" }}>Crea tu cuenta en FormuApp</h1>
          <div className="GoogleButton" onClick={handleGoogleRegister}>
            <img
              src="/img/icons/google-icon.webp"
              alt="Logo Google"
              width={20}
              style={{ marginRight: "10px" }}
            />
            <p>Registrate con Google</p>
          </div>
          <p style={{ marginTop: "20px" }}>
            o registrate con tu correo electronico
          </p>

          <form action="" className="form" onSubmit={handleEmailRegister}>
            <div className="form-group">
              <label htmlFor="firstName">Nombre</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellidos</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="email">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p style={{ margin: "20px 0px" }}>
              *Al crear una cuenta, aceptas los términos, condiciones y
              políticas de privacidad.
            </p>
            <button type="submit" className="loginButton">
              Crear cuenta
            </button>
            <p style={{ marginTop: "20px" }}>
              Ya tienes una cuenta,<Link to={"/login"}> Inicia Sesión</Link>
            </p>
          </form>
        </div>
        <div className="secondColumn"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
