import { Box, Typography } from "@mui/material";
import GridComponent from "../components/Grid";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Langlois", firstName: "Benjamin", age: 22 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 13, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 14, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 15, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 16, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 17, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 18, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 19, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 20, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 21, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 22, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 23, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 24, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 25, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 26, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 27, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 28, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 29, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 30, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 31, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 15 };

const Index = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", margin: "20px 0px" }}>
      <Typography variant="h1" sx={{ paddingBottom: "10px" }}>
        Catégories
      </Typography>
      <GridComponent rows={rows} columns={columns} paginationModel={paginationModel} />
    </Box>
  );
};
export default Index;
