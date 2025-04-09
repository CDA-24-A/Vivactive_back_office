import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface propsGridCompornentType {
  rows: any[];
  columns: GridColDef[];
  paginationModel: { page: number; pageSize: number };
}

export default function GridComponent({ rows, columns, paginationModel }: propsGridCompornentType) {
  return (
    <Paper sx={{ height: "100%", width: "100%", flex: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
