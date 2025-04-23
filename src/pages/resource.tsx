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
import  useCategory  from "../hooks/useCategory";
import  useResourcesType  from "../hooks/useResourceType";
import { RessourceStatus } from "../utils/enums";
import { formatISOToDateInput } from "../utils/date";

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
    valueGetter: (value) => `${RessourceStatus[value]}`,
  },
  {
    field: "typeRessource",
    headerName: "Type de ressource",
    width: 160,
    valueGetter: (value: { name: string }) => `${value.name}`,
  },
];

const Index = () => {
  const { fetchResources, resources, loading, error, createResource, updateResource, deleteResource } = useResources();
  const { fetchCategories, categories} = useCategory();
  const { fetchResourcesType, resourcesType} = useResourcesType();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [resourcesFiltered, setResourcesFiltered] = useState<ResourceType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<GridRowParams | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);

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
      options: categories.data.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
    },
    { name: "fileId", label: "Fichier", type: "file", validation: {}, showOn: "create" },
    { name: "bannerId", label: "Bannière", type: "banner", validation: {}, showOn: "create" },
    { name: "isValidate", label: "Validé ?", type: "checkbox", validation: {}, showOn: "edit" },
    {
      name: "status",
      label: "Statut",
      type: "dropdown",
      validation: { required: "Le statut est requis" },
      showOn: "always",
      options: [
        { value: "EN_ATTENTE", label: "En attente" },
        { value: "VALIDEE", label: "Validéee" },
        { value: "CLOTUREE", label: "Cloturée" },
        { value: "EN_COURS", label: "En cours" },
        { value: "EXPIREE", label: "Expirée" },
      ],
    },
    {
      name: "typeRessourceId",
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
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchResourcesType({ page: page, perPage: perPage });
  }, [perPage, page]);

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

  const handleRowDoubleClick = (rowData: any) => {
    console.log("Row double clicked:", rowData);
    setFormData({ ...rowData, row: { ...rowData.row, deadLine: formatISOToDateInput(rowData.row.deadLine) } });
    setOpen(true);
  };

  const handleSubmitClick = (data: ResourceType) => {
    console.log("Form submitted:", data);

    if (data.id) {
      updateResource(data.id, {
        ...data,
        categoryId: "54c35596-8852-4bd2-be25-95e75f6ed7e2",
        typeRessourceId: "813130a8-889b-48ca-bb0e-ff8b907e96c4",
        nbParticipant: data.nbParticipant && Number(data.nbParticipant),
        maxParticipant: data.maxParticipant && Number(data.maxParticipant),
        deadLine: data.deadLine && new Date(data.deadLine),
      });
    } else {
      createResource({
        ...data,
        categoryId: "54c35596-8852-4bd2-be25-95e75f6ed7e2",
        typeRessourceId: "813130a8-889b-48ca-bb0e-ff8b907e96c4",
        nbParticipant: Number(data.nbParticipant),
        maxParticipant: Number(data.maxParticipant),
        deadLine: data.deadLine ? new Date(data.deadLine) : new Date(),
      });
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
    setFile(data);
  };

  const handleBannerChange = (data: File) => {
    console.log("Banner submitted:", data);
    setBanner(banner);
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
