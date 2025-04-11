import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface propsGridCompornentType {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
  hideFooter?: boolean;
}

export default function GridComponent({ rows, columns, loading, hideFooter }: propsGridCompornentType) {
  return (
    <Paper sx={{ flex: 15, height: "70vh" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        sx={{ border: 0 }}
        localeText={{
          noRowsLabel: "Aucune donnée",
          noResultsOverlayLabel: "Aucun résultat trouvé",
        }}
        loading={loading}
        hideFooter={hideFooter}
      />
    </Paper>
  );
}
