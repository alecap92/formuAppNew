import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../contexts/store/Store";
import "./PerfilComponentStyles.css";
import { getUser, updateUser } from "../../../services/api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../contexts/features/loadingSlice";

interface FormData {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  idType?: string;
  idNumber?: string;
  mobile?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

const PerfilComponent: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormData>({});
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchUserData = async () => {
    const user = await getUser();

    setFormData({
      companyName: user?.companyName,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      idType: user?.idType,
      idNumber: user?.idNumber,
      mobile: user?.mobile,
      phone: user?.phone,
      address: user?.address,
      city: user?.city,
      state: user?.state,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes hacer algo con los datos del formulario, como enviarlos a una API

    dispatch(setLoading(true));
    await updateUser(formData);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (user) {
      setFormData({});
    }
    fetchUserData();
  }, [user]);

  return (
    <div className="PerfilComponent_container">
      <div style={{ width: "60%" }}>
        <div className="PerfilComponent_wrapper">
          <form className="PerfilComponent_form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="companyName">Nombre de la empresa</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="first-name">Nombre completo</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nombre completo</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="idType">Tipo de Identificación</label>
              <select
                id="idType"
                name="idType"
                value={formData.idType || ""}
                onChange={() => {
                  return handleChange;
                }}
              >
                <option value="" disabled>
                  Seleccione un tipo de identificación
                </option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="PA">Pasaporte</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="idNumber">Número de Identificación</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="celular">Celular</label>
              <input
                type="text"
                id="celular"
                name="celular"
                value={formData.mobile || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <h3 style={{ color: "#F65232" }}>Datos de Ubicación</h3>
              <hr />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">Departamento (Estado)</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state || ""}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Guardar</button>
          </form>
        </div>
      </div>
      <div>
        <div style={{ marginBottom: "10px" }}>
          <h3 style={{ color: "#F65232" }}>Logo de empresa</h3>
          <hr />
        </div>
        <div className="PerfilComponent_ImageContainer">
          <img
            src="https://via.placeholder.com/200x200.png"
            alt="Logo de empresa"
          />
          <p>Tamaño recomendado 200px X 200px (max 1mb)</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="file" name="" id="" />
            <button>Cargar Imagen</button>
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3 style={{ color: "#F65232" }}>Firma digital</h3>
          <hr />
        </div>
        <div className="PerfilComponent_ImageContainer">
          <img
            src="https://via.placeholder.com/200x200.png"
            alt="Firma digital"
          />
          <p>Tamaño recomendado 200px X 200px (max 1mb)</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="file" name="" id="" />
            <button>Cargar Imagen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilComponent;
