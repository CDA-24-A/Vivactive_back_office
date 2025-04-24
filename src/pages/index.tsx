import useCitizens from "../hooks/useCitizens";
import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import GridComponent from "../components/Grid";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { CitizenType } from "../types/citizen";
import ErrorComponent from "../components/Error";
import HeaderGrid from "../components/HeaderGrid";
import ModalEdition, { FieldConfig } from "../components/ModalEdition";
import { useDebounce } from "../hooks/useDebounce";
import { useAuthRedirect } from "../utils/redirect";

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
  useAuthRedirect();

  const { fetchCitizens, citizens, loading, error, createCitizen, updateCitizen, deleteCitizen } = useCitizens();
  console.log("la", error);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(1);
  const [formData, setFormData] = useState<GridRowParams | null>(null);
  const [search, setSearch] = useState<string>("");
  const [citizensFiltered, setCitiensFiltered] = useState<CitizenType[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  const createCitizenFormConfig: FieldConfig[] = [
    {
      name: "name",
      label: "Nom",
      type: "text",
      defaultValue: "",
      validation: { required: "Le nom est requis" },
      showOn: "always",
    },
    {
      name: "surname",
      label: "Prénom",
      type: "text",
      defaultValue: "",
      validation: { required: "Le prénom est requis" },
      showOn: "always",
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
      showOn: "always",
    },
    {
      name: "password",
      label: "Mot de passe",
      type: "password",
      defaultValue: "",
      validation: { required: "Le mot de passe est requis" },
      showOn: "create",
    },
    {
      name: "roleId",
      label: "Role ID",
      type: "text",
      defaultValue: "",
      validation: {},
      showOn: "create",
    },
  ];

  useEffect(() => {
    fetchCitizens({ page: page, perPage: perPage });
  }, [perPage, page]);

  useEffect(() => {
    const totalCount = Math.ceil(citizens.total / perPage);
    setCount(totalCount);
  }, [perPage, citizens]);

  useEffect(() => {
    const filtered = citizens.data.filter((c) => `${c.name} ${c.surname} ${c.email}`.toLowerCase().includes(debouncedSearch.trim().toLowerCase()));
    setCitiensFiltered(filtered);
  }, [debouncedSearch, citizens]);

  const handleRowDoubleClick = (rowData: any) => {
    setFormData(rowData);
    setOpen(true);
  };

  const handleSubmitClick = (data: CitizenType) => {
    if (data.id) {
      updateCitizen(data.id, { ...data, roleId: "7d725762-d488-4238-9414-cc70ec24a6f5" });
    } else {
      createCitizen(data);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (id: number) => {
    deleteCitizen(id);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%", backgroundColor: 'red' }}>
      <pre>{JSON.stringify(error)}</pre>
      {error && <ErrorComponent errorMessage={error?.message} />}
      {!loading && !error && (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <HeaderGrid title="Liste des citoyens" onAddClick={() => setOpen(true)} searchValue={search} onSearchChange={setSearch} />
          <GridComponent
            rows={citizensFiltered}
            columns={columns}
            loading={loading}
            hideFooter={true}
            onRowDoubleClick={(params) => handleRowDoubleClick(params)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, display: "flex", flexDirection: "row" }}>
              <InputLabel variant="outlined">Ligne par page</InputLabel>
              <Select
                value={perPage}
                onChange={(e: any) => {
                  setPerPage(parseInt(e.target.value));
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
              <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                -
              </Button>
              <Typography>
                {page} sur {count}
              </Typography>
              <Button onClick={() => setPage(page + 1)} disabled={page === count}>
                +
              </Button>
            </Box>
          </Box>

          <ModalEdition
            open={open}
            onClose={handleCloseModal}
            title={formData ? "Modifier un citoyen" : "Créer un citoyen"}
            fields={createCitizenFormConfig}
            onSubmit={handleSubmitClick}
            initialData={formData}
            TransitionProps={{ onExited: () => setFormData(null) }}
            onDelete={(id) => handleDeleteClick(id)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Index;
