import { Box, Typography, Input, InputBase, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { use, useCallback, useMemo, useState } from "react";
import { debounce } from "../service/search";
import AddIcon from "@mui/icons-material/Add";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
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
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Index = () => {
  const [searchValue, setSearchValue] = useState<String>("");
  const [filteredRows, setFilteredRows] = useState(rows);

  const debounceSearch = useCallback((value: string) => {
    setSearchValue(value);
    debouncedFilter(value);
  }, []);

  const debouncedFilter = useMemo(
    () =>
      debounce((value: string) => {
        setFilteredRows(
          rows.filter((row) => {
            const fullName = `${row.firstName || ""} ${row.lastName || ""}`.toLowerCase();
            return fullName.includes(value.toLowerCase());
          })
        );
      }, 500),
    [rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", padding: 2, gap: 5, justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h1">TEXT</Typography>
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "rgba(0,0,0,0.05)", borderRadius: 1, px: 2, width: "30vw", maxWidth: 950, height: 40 }}>
          <SearchIcon />
          <InputBase
            placeholder="Rechercher"
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            onChange={(event) => debounceSearch(event.target.value)}
          />
        </Box>
        <Button variant="contained">
          <AddIcon />
        </Button>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
export default Index;
