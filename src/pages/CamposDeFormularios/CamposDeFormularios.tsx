import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaInfoCircle, FaPlus, FaSearch } from "react-icons/fa";
import NuevoCampoModal from "./components/NuevoCampoModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../contexts/store/Store";
import { getUser } from "../../services/api";
import { debounce } from "../../utils/debouncer";

const CamposDeFormularios: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contactFields, setContactFields] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dispatch = useDispatch();

  const fields = useSelector(
    (state: RootState) => state.user.settings.contactProperties
  );

  useEffect(() => {
    const getProperties = async () => {
      const fetchUser = await getUser();
      dispatch({ type: "SET_USER", payload: fetchUser });

      const sortedContactProperties = fetchUser.settings.contactProperties.sort(
        (a: any, b: any) => a.key.localeCompare(b.key)
      );

      setContactFields(sortedContactProperties);
    };

    getProperties();
  }, [dispatch]);

  useEffect(() => {
    const handleSearch = debounce((searchTerm: string) => {
      if (searchTerm) {
        const filteredFields = fields.filter((field: any) =>
          field.key.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setContactFields(filteredFields);
      } else {
        setContactFields(fields);
      }
    }, 300);

    handleSearch(searchTerm);
  }, [searchTerm, fields]);

  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Campos de Formularios y propiedades de contactos</h1>
          <button
            type="button"
            className="subMenuContainerButton"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Crear Campo
          </button>
        </div>
      </div>

      <div className="global-fila">
        <div>
          <div className="global-search-input">
            <FaSearch />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre del campo</th>
                <th>Valor por defecto</th>
              </tr>
            </thead>
            <tbody>
              {contactFields.length > 0 ? (
                contactFields.map((field: any) => (
                  <tr key={field._id}>
                    <td>{field.key}</td>
                    <td>
                      {field.value === "" ? (
                        <p>no hay valor por defecto</p>
                      ) : (
                        field.value
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>No hay Propiedades creadas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <div className="global-icon-row">
            <FaInfoCircle />
            <h2>Conoce los campos</h2>
          </div>
          <h3>Qué son los campos de formularios</h3>
          <p>
            Para lograr autocompletar los documentos, FormuApp utiliza variables
            para identificar la posición y valores que llevan los campos. En
            ocasiones necesitamos campos más personalizados para nuestra
            empresa.
          </p>
          <h3>Campos Por defecto</h3>
          <p>
            Para que FormuApp funcione, requerimos dejar algunos campos
            genéricos por defecto como Nombre, Celular, Dirección los cuales no
            podrán ser eliminados o modificados.
          </p>
          <h3>Campos Personalizados</h3>
          <p>
            Crea los campos necesarios para tu negocio, ya sea si es una
            inmobiliaria, concesionario de vehículos o una ferretería, puedes
            crear tus propias variables para reutilizar en todos tus documentos.
          </p>
          <h3>Valor por defecto</h3>
          <p>
            En ocasiones necesitamos traer la misma información en una variable,
            utilizando el campo de valor por defecto, podrás traer el valor de
            la variable.
          </p>
        </div>
      </div>
      {showModal && (
        <NuevoCampoModal
          setShowModal={setShowModal}
          getProperties={() => {
            // Si es necesario, puedes mantener esta función aquí para actualizar
            const fetchUser = async () => {
              const user = await getUser();
              dispatch({ type: "SET_USER", payload: user });
              const sortedContactProperties =
                user.settings.contactProperties.sort((a: any, b: any) =>
                  a.key.localeCompare(b.key)
                );
              setContactFields(sortedContactProperties);
            };
            fetchUser();
          }}
        />
      )}
    </MainLayout>
  );
};

export default CamposDeFormularios;
