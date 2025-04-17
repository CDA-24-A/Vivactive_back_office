// GenericModal.tsx
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password";
  defaultValue?: string | number;
  validation?: Record<string, any>;
  showOn: "create" | "edit" | "always";
}

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
  onDelete?: (id: number) => void;
  initialData?: any;
  TransitionProps?: {
    onExited: () => void;
  };
}

const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, title, onSubmit, fields, initialData, onDelete, TransitionProps }) => {
  const isEdit = Boolean(initialData);

  const {
    handleSubmit,
    control,
    reset,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: initialData || {},
  });

  // État pour contrôler l'affichage du mot de passe pour chaque champ
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Reset du formulaire avec initialData
    reset(initialData || {});
    // Initialisation de l'état showPassword à false pour tous les champs password
    const initVisibility: Record<string, boolean> = {};
    fields.forEach((f) => {
      if (f.type === "password") initVisibility[f.name] = false;
    });
    setShowPassword(initVisibility);
  }, [initialData, reset, fields]);

  // Filtrage des champs selon le mode
  const filteredFields = fields.filter((field) => field.showOn === "always" || (isEdit && field.showOn === "edit") || (!isEdit && field.showOn === "create"));

  // Handler pour toggle l'affichage
  const handleClickShowPassword = (name: string) => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Construction du payload de PATCH
  const handlePatch = (data: any) => {
    const payload = Object.keys(dirtyFields).reduce((acc, key) => {
      (acc as any)[key] = (data as any)[key];
      return acc;
    }, {} as any);
    onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionProps={TransitionProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form id="generic-form" onSubmit={handleSubmit(isEdit ? handlePatch : onSubmit)}>
          {filteredFields.map((field) => {
            // Déterminer le type à afficher dynamiquement
            const isPwd = field.type === "password";
            const type = isPwd ? (showPassword[field.name] ? "text" : "password") : field.type;

            return (
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                defaultValue={field.defaultValue || ""}
                rules={field.validation}
                render={({ field: ctrl, fieldState: { error } }) => (
                  <Box sx={{ display: "flex", alignItems: "center", width: "25vw", mt: 2 }}>
                    <TextField
                      {...ctrl}
                      label={field.label}
                      type={type}
                      fullWidth
                      variant="outlined"
                      error={!!error}
                      helperText={error?.message}
                      InputProps={
                        isPwd
                          ? {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(field.name)} edge="end">
                                    {showPassword[field.name] ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }
                          : undefined
                      }
                    />
                  </Box>
                )}
              />
            );
          })}
        </form>
      </DialogContent>
      <DialogActions sx={{ justifyContent: initialData?.id ? "space-between" : "flex-end" }}>
        {isEdit && initialData?.id && (
          <Button color="warning" onClick={() => onDelete?.(initialData.id)}>
            Supprimer
          </Button>
        )}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={onClose} color="secondary">
            Annuler
          </Button>
          <Button type="submit" form="generic-form" color="primary" variant="contained">
            Valider
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GenericModal;
