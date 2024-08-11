import { IFile } from "../../types/types";
import axiosConfig from "./axiosConfig";

const getFile = async (id: string): Promise<IFile> => {
  try {
    const response = await axiosConfig.get(`/files/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el archivo", error);
    throw error;
  }
};

const getFilePdf = async (id: string): Promise<IFile> => {
  try {
    const response = await axiosConfig.get(`/files/pdf/${id}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el archivo", error);
    throw error;
  }
};

const getFiles = async (): Promise<IFile[]> => {
  try {
    const response = await axiosConfig.get("/files");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los archivos", error);
    throw error;
  }
};

const getPrivateFiles = async (): Promise<IFile[]> => {
  try {
    const response = await axiosConfig.get("/files/private");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los archivos privados", error);
    throw error;
  }
};

const createFile = async (formData: FormData) => {
  // Verificar si los campos requeridos están presentes
  if (
    !formData.has("name") ||
    !formData.has("category") ||
    !formData.has("file")
  ) {
    console.error("Form data is missing required fields.");
    throw new Error("Form data is missing required fields.");
  }

  try {
    const response = await axiosConfig.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating file", error);
    throw error;
  }
};

const deleteFile = async (id: string) => {
  try {
    const response = await axiosConfig.delete(`/files/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting file", error);
    throw error;
  }
};

const getTemplatePdf = async (id: string) => {
  try {
    const response = await axiosConfig.get(`files/template/${id}`, {
      responseType: "arraybuffer",
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener el archivo", error);
    throw error;
  }
};

const fileService = {
  getFile, // trae la informacion que tiene file
  getFilePdf, // trae el archivo PDF file con el pdf buscando por idFile
  getFiles,
  getPrivateFiles,
  createFile,
  deleteFile,
  getTemplatePdf,
};

export default fileService;
