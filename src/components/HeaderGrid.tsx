import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface HeaderGridProps {
  title: string;
  onAddClick: () => void;
}

function HeaderGrid({ title, onAddClick }: HeaderGridProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px", flex: 1 }}>
      <Typography variant="h1" sx={{ paddingBottom: "10px" }}>
        {title}
      </Typography>
      <Button variant="contained" onClick={onAddClick}>
        Ajouter
      </Button>
    </Box>
  );
}

export default HeaderGrid;
