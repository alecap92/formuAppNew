import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaSearch, FaTrash } from "react-icons/fa";
import "./HistorialStyles.css";
import HistorialModal from "./HistorialModal";
import procedureService from "../../services/api/procedureService";
import { useDispatch } from "react-redux";
import { addAlert } from "../../contexts/features/alertSlice";
import { setLoading } from "../../contexts/features/loadingSlice";
import { debounce } from "../../utils/debouncer";

const Historial = () => {
  const [showModal, setShowModal] = useState(false);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [filteredProcedures, setFilteredProcedures] = useState<any[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const procedures = await procedureService.getProcedures();
        setProcedures(procedures);
        setFilteredProcedures(procedures);

        const recentProcedureId = localStorage.getItem("recentProcedureId");
        if (recentProcedureId) {
          dispatch(setLoading(true));
          openModalWithFile(recentProcedureId);
          localStorage.removeItem("recentProcedureId");
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleSearch = debounce((query: string) => {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = procedures.filter((procedure) =>
        procedure.name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProcedures(filtered);
      setCurrentPage(1);
    }, 300);

    const inputElement =
      document.querySelector<HTMLInputElement>("#searchInput");
    if (inputElement) {
      inputElement.addEventListener("input", (e) =>
        handleSearch((e.target as HTMLInputElement).value)
      );
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", (e) =>
          handleSearch((e.target as HTMLInputElement).value)
        );
      }
    };
  }, [procedures]);

  const openModalWithFile = (procedureId: string) => {
    setSelectedFileId(procedureId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(setLoading(false));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = filteredProcedures.map((procedure) => procedure._id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProcedures.length / itemsPerPage);
  const displayedProcedures = filteredProcedures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    try {
      dispatch(setLoading(true));
      await procedureService.deleteProcedure(id);
      const newProcedures = procedures.filter(
        (procedure: any) => procedure._id !== id
      );
      setProcedures(newProcedures);
      dispatch(setLoading(false));
      dispatch(
        addAlert({
          id: new Date().toISOString(),
          message: "Eliminado exitosamente",
          type: "success",
        })
      );
    } catch (error) {
      console.error("Error deleting procedure:", error);
    }
  };

  return (
    <MainLayout>
      <>
        <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1>Historial de documentos</h1>
              <p>Revisa los documentos que has creado.</p>
            </div>
          </div>
        </div>
        <div className="Historial_container">
          <div className="Historial_container_search">
            <FaSearch />
            <input
              type="text"
              id="searchInput"
              placeholder="Buscar documento"
            />
          </div>
          <table className="Hitorial_Table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedItems.length === filteredProcedures.length}
                  />
                </th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Fecha</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {displayedProcedures.length > 0 ? (
                displayedProcedures.map((procedure: any) => (
                  <tr
                    key={procedure._id}
                    className={
                      selectedItems.includes(procedure._id) ? "checked-row" : ""
                    }
                  >
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleSelectItem(procedure._id)}
                        checked={selectedItems.includes(procedure._id)}
                      />
                    </td>
                    <td onClick={() => openModalWithFile(procedure._id)}>
                      {procedure.name}
                    </td>
                    <td onClick={() => openModalWithFile(procedure._id)}>
                      {procedure.category}
                    </td>
                    <td onClick={() => openModalWithFile(procedure._id)}>
                      {procedure.createdAt}
                    </td>
                    <td>
                      <div
                        onClick={() => handleDelete(procedure._id)}
                        className="Historial__trashIcon"
                      >
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No hay procedimientos</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination-container">
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span>{`${currentPage} de ${totalPages}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
            <div className="items-per-page">
              <label htmlFor="itemsPerPage">Mostrar:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>

        {showModal && selectedFileId && (
          <HistorialModal
            showModal={showModal}
            procedureId={selectedFileId}
            closeModal={closeModal}
          />
        )}
      </>
    </MainLayout>
  );
};

export default Historial;
