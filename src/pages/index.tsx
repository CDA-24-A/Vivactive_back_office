import useCitizens from "../hooks/useCitizens";
import { useEffect } from "react";
import { Box, Pagination, TablePagination, Typography } from "@mui/material";
import GridComponent from "../components/Grid";
import { GridColDef } from "@mui/x-data-grid";
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
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
      {error && <ErrorComponent errorMessage={error?.message} />}
      {!loading && !error && (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <HeaderGrid title="Liste des citoyens" onAddClick={() => setOpen(true)} />
          <GridComponent rows={citizens.data} columns={columns} loading={loading} hideFooter={true} />
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
          />
        </Box>
      )}
    </Box>
  );
};
export default Index;
