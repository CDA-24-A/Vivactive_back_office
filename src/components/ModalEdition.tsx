// GenericModal.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password";
  defaultValue?: string | number;
  validation?: Record<string, any>;
}

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
}

const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, title, onSubmit, fields }) => {
  const { handleSubmit, control } = useForm();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form id="generic-form" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              defaultValue={field.defaultValue || ""}
              rules={field.validation}
              render={({ field: controllerField, fieldState: { error } }) => (
                <TextField
                  {...controllerField}
                  label={field.label}
                  type={field.type}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button type="submit" form="generic-form" color="primary" variant="contained">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericModal;
