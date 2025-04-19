import useResources from "../hooks/useResources";
import { useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import GridComponent from "../components/Grid";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Resource } from "../types/resource";
import ErrorComponent from "../components/Error";
import HeaderGrid from "../components/HeaderGrid";
import ModalEdition, { FieldConfig } from "../components/ModalEdition";
import { useDebounce } from "../hooks/useDebounce";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Titre", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
  {
    field: "maxParticipant",
    headerName: "Nombre max de participants",
    width: 250,
  },
  {
    field: "deadLine",
    headerName: "Date limite",
    width: 160,
    valueGetter: (value: Date) => `${new Date(value).toLocaleDateString("fr-FR")}`,
  },
  {
    field: "category",
    headerName: "Categorie",
    width: 160,
    valueGetter: (value: { name: string }) => `${value.name}`,
  },
  {
    field: "isValidate",
    headerName: "Validé ?",
    width: 160,
    valueGetter: (value: boolean) => `${value ? "Oui" : "Non"}`,
  },
  {
    field: "status",
    headerName: "Statut",
    width: 160,
  },
  {
    field: "ressourceType",
    headerName: "Type de ressource",
    width: 160,
    valueGetter: (value: { name: string }) => `${value.name}`,
  },
];

const Index = () => {
  const { fetchResources, resources, loading, error, createResource, updateResource, deleteResource } = useResources();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [resourcesFiltered, setResourcesFiltered] = useState<Resource[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchResources({ page: page, perPage: perPage });
  }, [perPage, page]);

  useEffect(() => {
    const totalCount = Math.ceil(resources.total / perPage);
    setCount(totalCount);
  }, [perPage, resources]);

  useEffect(() => {
    const filtered = resources.data.filter((c) => c);
    setResourcesFiltered(filtered);
  }, [debouncedSearch, resources]);

  const handleRowDoubleClick = (rowData: any) => {};

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
      {error && <ErrorComponent errorMessage={error?.message} />}
      {!loading && !error && (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <HeaderGrid title="Liste des ressources" onAddClick={() => setOpen(true)} searchValue={search} onSearchChange={setSearch} />
          <GridComponent
            rows={resourcesFiltered}
            columns={columns}
            loading={loading}
            hideFooter={true}
            onRowDoubleClick={(params) => {
              handleRowDoubleClick(params);
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, display: "flex", flexDirection: "row" }}>
              <InputLabel variant="outlined">Ligne par page</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={perPage}
                label="Ligne par page"
                sx={{ width: "100%" }}
                onChange={(data: any) => {
                  setPerPage(parseInt(data.target.value));
                  setPage(1);
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => {
                  setPage(page - 1);
                }}
                disabled={page === 1}
              >
                -
              </Button>
              <Typography>
                {page} sur {count}
              </Typography>
              <Button
                onClick={() => {
                  setPage(page + 1);
                }}
                disabled={page === count}
              >
                +
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default Index;
