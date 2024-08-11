import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaPlus, FaSearch } from "react-icons/fa";
import "./ContactosStyles.css";
import ContactModal from "./components/ContactModal/ContactModal";
import { contactService, Contact } from "../../services/api/contactService";
import { debounce } from "../../utils/debouncer";

const Contactos: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await contactService.getContacts();

        setContacts(fetchedContacts);
        setFilteredContacts(fetchedContacts);
      } catch (error) {
        console.error("Error al cargar los contactos", error);
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = debounce((term: string) => {
    const filtered = contacts.filter((contact) =>
      contact.properties.some((property) =>
        property.value.toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredContacts(filtered);
  }, 300);

  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1>Contactos</h1>
            <p>{contacts.length} Contactos</p>
          </div>
          <button
            type="button"
            className="subMenuContainerButton"
            onClick={() => setIsOpenModal(true)}
          >
            <FaPlus /> Crear Contacto
          </button>
        </div>
      </div>
      <div className="Contactos_container">
        <div className="Contactos_buscador">
          <FaSearch />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar contacto"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <tr key={contact._id}>
                  <td>
                    {contact.properties.find(
                      (property) => property.key === "firstName"
                    )?.value || ""}{" "}
                    {contact.properties.find(
                      (property) => property.key === "lastName"
                    )?.value || ""}
                  </td>
                  <td>
                    {contact.properties.find(
                      (property) => property.key === "email"
                    )?.value || ""}
                  </td>
                  <td>
                    {contact.properties.find(
                      (property) => property.key === "cellphone"
                    )?.value || ""}
                  </td>
                  <td>
                    {contact.properties.find(
                      (property) => property.key === "city"
                    )?.value || ""}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No hay contactos creados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isOpenModal && (
        <ContactModal
          setIsOpenModal={setIsOpenModal}
          fetchContacts={() => {
            const fetchAgain = async () => {
              try {
                const fetchedContacts = await contactService.getContacts();
                setContacts(fetchedContacts);
                setFilteredContacts(fetchedContacts);
              } catch (error) {
                console.error("Error al cargar los contactos", error);
              }
            };
            fetchAgain();
          }}
        />
      )}
    </MainLayout>
  );
};

export default Contactos;
