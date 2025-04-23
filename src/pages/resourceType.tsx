import useTypeResources from "../hooks/useResourceType";
import { useEffect } from "react";
import { Box } from "@mui/material";
import GridComponent from "../components/Grid";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { ResourceTypeType } from "../types/resourceTypeType";
import ErrorComponent from "../components/Error";
import HeaderGrid from "../components/HeaderGrid";
import { useDebounce } from "../hooks/useDebounce";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nom", width: 130 },
];

const Index = () => {
  const { fetchResourcesType, resourcesType, loading, error } = useTypeResources();
  const [search, setSearch] = useState<string>("");
  const [typeResourcesFiltered, setCitiensFiltered] = useState<ResourceTypeType[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchResourcesType();
  }, []);

  useEffect(() => {
    const filtered = resourcesType.data.filter((c) => `${c.name}`.toLowerCase().includes(debouncedSearch.trim().toLowerCase()));
    setCitiensFiltered(filtered);
  }, [debouncedSearch, resourcesType]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
      {error && <ErrorComponent errorMessage={error?.message} />}
      {!loading && !error && (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <HeaderGrid title="Liste des types de ressources" searchValue={search} onSearchChange={setSearch} />
          <GridComponent rows={typeResourcesFiltered} columns={columns} loading={loading} hideFooter={true} onRowDoubleClick={(params) => {}} />
        </Box>
      )}
    </Box>
  );
};
export default Index;
