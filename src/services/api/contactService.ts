import axiosConfig from "./axiosConfig";

export interface ContactHandler {
  getContacts: () => void;
  createContact: (contactData: any) => void;
  getContactById: (id: string) => void;
  updateContact: (id: string, contactData: any) => void;
  deleteContact: (id: string) => void;
}

export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  properties: { key: string; value: string; isVisible: boolean }[];
  createdAt: Date;
  updatedAt: Date;
  email: string;
}

// Define la interfaz para los datos del contacto que se van a crear o actualizar
export interface ContactData {
  firstName: string;
  lastName: string;
  properties: { key: string; value: string; isVisible: boolean }[];
}

const getContacts = async (): Promise<Contact[]> => {
  try {
    const response = await axiosConfig.get<Contact[]>("/contacts");
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud", error);
    throw error;
  }
};

const createContact = async (contactData: any) => {
  try {
    const response = await axiosConfig.post("/contacts", contactData);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud", error);
    throw error;
  }
};

const getContactById = async (id: string) => {
  try {
    const response = await axiosConfig.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud", error);
    throw error;
  }
};

const updateContact = async (id: string, contactData: any) => {
  try {
    const response = await axiosConfig.put(`/contacts/${id}`, contactData);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud", error);
    throw error;
  }
};

const deleteContact = async (id: string) => {
  try {
    const response = await axiosConfig.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud", error);
    throw error;
  }
};

// Exportar todas las funciones del servicio
export const contactService = {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
