import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../../components/Layout/MainLayout";
import CardComponent from "../../components/card/CardComponent";
import { FaSearch } from "react-icons/fa";
import fileService from "../../services/api/fileService";
import { debounce } from "../../utils/debouncer";
import { setLoading } from "../../contexts/features/loadingSlice";
import { IFile } from "../../types/types";
import "./FormatosStyles.css";

const Formatos = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const getFiles = async () => {
    const files = await fileService.getFiles();
    const sortedFiles = files.sort((a: IFile, b: IFile) =>
      a.isPublic === b.isPublic ? 0 : a.isPublic ? 1 : -1
    );
    setFiles(sortedFiles);
  };

  const handleDelete = async (id: string) => {
    try {
      dispatch(setLoading(true));
      await fileService.deleteFile(id);
      getFiles();
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error al eliminar el archivo", error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
  }, 500);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1>Plantillas Disponibles</h1>
            <p>Crea documentos con los formatos disponibles</p>
          </div>
        </div>
      </div>
      <div className="Plantillas_container">
        <div className="Plantillas_search">
          <FaSearch />
          <input
            type="text"
            name="buscar"
            id="buscar"
            placeholder="Buscar plantillas.."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <p
          style={{
            textAlign: "right",
            marginTop: "20px",
            marginBottom: "10px",
            color: "#939393",
          }}
        >
          Total Formatos: {filteredFiles?.length || 0}
        </p>
        <div id="Plantillas_grid">
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <CardComponent
                key={file._id}
                title={file.name}
                category={file.category}
                usageCount={0}
                onClick={() => {}}
                fetchFiles={getFiles}
                id={file._id}
                handleDelete={() => {
                  handleDelete(file._id);
                }}
                activeModalId={activeModalId}
                setActiveModalId={setActiveModalId}
              />
            ))
          ) : (
            <p>No hay formatos de documentos</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Formatos;
