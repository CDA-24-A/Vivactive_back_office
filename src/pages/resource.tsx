import useResources from "../hooks/useResources";
import { useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import GridComponent from "../components/Grid";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ResourceType } from "../types/resource";
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
  const [resourcesFiltered, setResourcesFiltered] = useState<ResourceType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<GridRowParams | null>(null);
  const [file, setFile] = useState<Field | null>(null);
  const [banner, setBanner] = useState<Field | null>(null);

  const ressourceFormConfig: FieldConfig[] = [
    { name: "title", label: "Titre", type: "text", validation: { required: "Le titre est requis" }, showOn: "always" },
    { name: "description", label: "Description", type: "text", validation: { required: "La description est requise" }, showOn: "always" },
    { name: "maxParticipant", label: "Max participants", type: "number", validation: { min: { value: 1, message: ">=1" } }, showOn: "always" },
    { name: "nbParticipant", label: "Participants actuels", type: "number", validation: { min: { value: 0, message: ">=0" } }, showOn: "always" },
    { name: "deadLine", label: "Date limite", type: "date", validation: {}, showOn: "always" },
    {
      name: "categoryId",
      label: "Catégorie",
      type: "dropdown",
      validation: { required: "La catégorie est requise" },
      showOn: "always",
      options: [
        { value: "test", label: "Nom de label" },
        { value: "test", label: "Nom de label" },
        { value: "test", label: "Nom de label" },
        { value: "test", label: "Nom de label" },
      ],
    },
    { name: "fileId", label: "Fichier", type: "file", validation: {}, showOn: "create" },
    { name: "bannerId", label: "Bannière", type: "banner", validation: {}, showOn: "create" },
    { name: "isValidate", label: "Validé ?", type: "password", validation: {}, showOn: "edit" },
    {
      name: "status",
      label: "Statut",
      type: "dropdown",
      validation: { required: "Le statut est requis" },
      showOn: "always",
      options: [
        { value: "test", label: "Nom de label" },
        { value: "test", label: "Nom de label" },
        { value: "test", label: "Nom de label" },
        { value: "test", label: "Nom de label" },
      ],
    },
    {
      name: "ressourceTypeId",
      label: "Type de ressource",
      type: "dropdown",
      validation: { required: "Le type est requis" },
      showOn: "always",
      options: [
        { value: "test", label: "Nom de label" },
        { value: "test", label: "Nom de label" },
        { value: "test", label: "Nom de label" },
        { value: "test", label: "Nom de label" },
      ],
    },
  ];

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchResources({ page: page, perPage: perPage });
  }, [perPage, page]);

  useEffect(() => {
    const totalCount = Math.ceil(resources.total / perPage);
    setCount(totalCount);
  }, [perPage, resources]);

  useEffect(() => {
    const filtered = resources.data.filter((c) => `${c.title} ${c.description}`.toLowerCase().includes(debouncedSearch.trim().toLowerCase()));
    console.log(filtered);

    setResourcesFiltered(filtered);
  }, [debouncedSearch, resources]);

  const handleRowDoubleClick = (rowData: any) => {};

  const handleSubmitClick = (data: ResourceType) => {
    console.log("Data submitted:", data);
    console.log("File submitted:", file);
    console.log("File submitted:", file?.get("fileBytes"));

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      console.log(key, value);
      formData.append(key, value);
    });
    if (file) {
      formData.append("fileBytes", file, file.name);
    }
    if (data.id) {
      // updateResource(data.id, FormData);
    } else {
      createResource(formData);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (id: number) => {
    console.log("Delete citizen with ID:", id);
    deleteResource(id);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleFileChange = (data: File) => {
    console.log("File submitted:", data);
    setFile((prev) => {
      const newFormData = prev || new FormData();
      newFormData.append("fileBytes", data, data.name);
      return newFormData;
    });
  };

  const handleBannerChange = (data: File) => {
    console.log("Banner submitted:", data);
    setBanner((prev) => {
      const newFormData = prev || new FormData();
      newFormData.append("bannerBytes", data, data.name);
      return newFormData;
    });
  };

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
          <ModalEdition
            open={open}
            onClose={() => handleCloseModal()}
            title={formData ? "Modifier une ressource" : "Créer une ressource"}
            fields={ressourceFormConfig}
            onSubmit={(data) => handleSubmitClick(data)}
            initialData={formData}
            TransitionProps={{ onExited: () => setFormData(null) }}
            onDelete={(id) => {
              handleDeleteClick(id);
            }}
            onSubmitFile={(data) => handleFileChange(data)}
            onSubmitBanner={(data) => handleBannerChange(data)}
          />
        </Box>
      )}
    </Box>
  );
};
export default Index;
