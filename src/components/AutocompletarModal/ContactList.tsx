import React, { useState, useEffect } from "react";
import "./ContactListStyles.css";
import { contactService } from "../../services/api/contactService";

type ContactListProps = {
  onSelectContact: (contact: any) => void;
};

const ContactList: React.FC<ContactListProps> = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await contactService.getContacts();
        setContacts(result);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.properties.some((prop: any) =>
      prop.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="ContactList_container">
      <input
        type="text"
        placeholder="Buscar contacto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="ContactList_table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact._id}>
              <td>
                {
                  contact.properties.find((p: any) => p.key === "firstName")
                    ?.value
                }
              </td>
              <td>
                {contact.properties.find((p: any) => p.key === "email")?.value}
              </td>
              <td>
                {contact.properties.find((p: any) => p.key === "phone")?.value}
              </td>
              <td>
                <button onClick={() => onSelectContact(contact)}>
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
