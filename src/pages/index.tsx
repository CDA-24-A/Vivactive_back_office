import useCitizens from "../hooks/useCitizens";
import { useEffect } from "react";
import { Box, Pagination, TablePagination, Typography } from "@mui/material";
import GridComponent from "../components/Grid";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Citizen, CitizenAdd, Citizens } from "../types/citizen";
import ErrorComponent from "../components/Error";
import HeaderGrid from "../components/HeaderGrid";
import ModalEdition, { FieldConfig } from "../components/ModalEdition";
import { set } from "react-hook-form";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Prénom", width: 130 },
  { field: "surname", headerName: "Nom", width: 130 },
  {
    field: "email",
    headerName: "Mail",
    width: 250,
  },
  {
    field: "fullName",
    headerName: "Nom complet",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.name || ""}`,
  },
  {
    field: "role",
    headerName: "Rôle",
    width: 160,
    valueGetter: (value: { name: string }) => `${value.name}`,
  },
];

const Index = () => {
  const { fetchCitizens, citizens, loading, error, createCitizen } = useCitizens();
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(1);
  const [formData, setFormData] = useState<GridRowParams | null>(null);

  const createCitizenFormConfig: FieldConfig[] = [
    {
      name: "name",
      label: "Nom",
      type: "text",
      defaultValue: "",
      validation: { required: "Le nom est requis" },
    },
    {
      name: "surname",
      label: "Prénom",
      type: "text",
      defaultValue: "",
      validation: { required: "Le prénom est requis" },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      defaultValue: "",
      validation: {
        required: "L'email est requis",
        pattern: {
          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          message: "L'email n'est pas valide",
        },
      },
    },
    {
      name: "password",
      label: "Mot de passe",
      type: "password",
      defaultValue: "",
      validation: { required: "Le mot de passe est requis" },
    },
    {
      name: "roleId",
      label: "Role ID",
      type: "text",
      defaultValue: "",
      validation: {}, // Champ optionnel, pas de règle "required"
    },
  ];

  useEffect(() => {
    fetchCitizens({ page: page, perPage: perPage });
  }, [perPage, page]);

  useEffect(() => {
    console.log(citizens.total);

    console.log(perPage);

    const totalCount = Math.ceil(citizens.total / perPage);
    setCount(totalCount);
  }, [perPage, citizens]);

  const handleRowDoubleClick = (rowData: any) => {
    setFormData(rowData);
    setOpen(true);
  };

  const handleSubmitClick = (data: Omit<Citizen, "id">) => {
    createCitizen(data);
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
      {error && <ErrorComponent errorMessage={error?.message} />}
      {!loading && !error && (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <HeaderGrid title="Liste des citoyens" onAddClick={() => setOpen(true)} />
          <GridComponent
            rows={citizens.data}
            columns={columns}
            loading={loading}
            hideFooter={true}
            onRowDoubleClick={(params) => {
              handleRowDoubleClick(params);
            }}
          />
          <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={(event, newPage) => {
              setPage(newPage + 1);
            }}
            rowsPerPage={perPage}
            onRowsPerPageChange={(data) => {
              setPerPage(parseInt(data.target.value));
            }}
            labelRowsPerPage="Nombre de ligne "
            sx={{ marginTop: "20px", flex: 1 }}
          />
          <ModalEdition
            open={open}
            onClose={() => setOpen(false)}
            title="Ajouter un citoyen"
            fields={createCitizenFormConfig}
            onSubmit={(data) => handleSubmitClick(data)}
            initialData={formData}
          />
        </Box>
      )}
    </Box>
  );
};
export default Index;
