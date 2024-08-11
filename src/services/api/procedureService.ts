import axiosConfig from "./axiosConfig";

const createProcedure = async (formData: {}) => {
  try {
    const response = await axiosConfig.post("/procedures", formData);

    return response.data;
  } catch (error) {
    console.error("Error al crear el procedimiento", error);
    throw error;
  }
};

const getProcedures = async () => {
  try {
    const response = await axiosConfig.get("/procedures");

    return response.data;
  } catch (error) {
    console.error("Error al obtener los procedimientos", error);
    throw error;
  }
};

const getProcedurePdf = async (id: string) => {
  const response = await axiosConfig.get(`/procedures/pdf/${id}`, {
    responseType: "blob",
  });

  return response;
};

const deleteProcedure = async (id: string) => {
  try {
    const response = await axiosConfig.delete(`/procedures/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error al eliminar el procedimiento", error);
    throw error;
  }
};

const procedureService = {
  createProcedure,
  getProcedures,
  getProcedurePdf,
  deleteProcedure,
};

// Exporta la variable con nombre
export default procedureService;
