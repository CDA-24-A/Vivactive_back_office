import useCategories from "../hooks/useCategory";
import { useEffect } from "react";
import { Box } from "@mui/material";
import GridComponent from "../components/Grid";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { CategoryType } from "../types/category";
import ErrorComponent from "../components/Error";
import HeaderGrid from "../components/HeaderGrid";
import { useDebounce } from "../hooks/useDebounce";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nom", width: 130 },
];

const Index = () => {
  const { fetchCategories, categories, loading, error } = useCategories();
  const [search, setSearch] = useState<string>("");
  const [categoriesFiltered, setCategoriesFiltered] = useState<CategoryType[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.data.filter((c) => `${c.name}`.toLowerCase().includes(debouncedSearch.trim().toLowerCase()));
    setCategoriesFiltered(filtered);
  }, [debouncedSearch, categories]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
      {error && <ErrorComponent errorMessage={error?.message} />}
      {!loading && !error && (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <HeaderGrid title="Liste des catégories" searchValue={search} onSearchChange={setSearch} />
          <GridComponent rows={categoriesFiltered} columns={columns} loading={loading} hideFooter={true} onRowDoubleClick={(params) => {}} />
        </Box>
      )}
    </Box>
  );
};
export default Index;
