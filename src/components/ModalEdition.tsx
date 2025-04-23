import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, InputAdornment, MenuItem } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "dropdown" | "textArea";
  validation?: Record<string, any>;
  showOn: "create" | "edit" | "always";
  options?: Array<{ value: string | number; label: string }> | null;
  isDisabled?: boolean;
  dataFormat?: (value: any) => string;
}

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  onSubmit?: (data: any) => void;
  onDelete?: (id: string) => void;
  initialData?: Record<string, any>;
  TransitionProps?: { onExited: () => void };
}

const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, title, onSubmit, fields, initialData, onDelete, TransitionProps }) => {
  const isEdit = Boolean(initialData);

  const {
    handleSubmit,
    control,
    reset,
    formState: { dirtyFields },
  } = useForm<Record<string, any>>({
    defaultValues: initialData?.row || {},
    shouldUnregister: false,
  });

  // Show/hide password state
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  useEffect(() => {
    console.log("Initial data:", initialData);

    if (open) {
      reset(initialData?.row || {});
      const vis: Record<string, boolean> = {};
      fields.forEach((f) => {
        if (f.type === "password") vis[f.name] = false;
      });
      setShowPassword(vis);
    }
  }, [open, initialData, reset, fields]);

  // Filter fields by mode
  const filteredFields = fields.filter((f) => f.showOn === "always" || (isEdit && f.showOn === "edit") || (!isEdit && f.showOn === "create"));

  const handleClickShowPassword = (name: string) => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handlePatch = (data: any) => {
    const payload = Object.keys({ ...dirtyFields, id: initialData?.id }).reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {} as Record<string, any>);
    if (onSubmit) {
      onSubmit(payload);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionProps={TransitionProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form id="generic-form" onSubmit={handleSubmit(isEdit ? handlePatch : onSubmit || (() => {}))}>
          {filteredFields.map((field) => {
            const isPwd = field.type === "password";
            const type = isPwd && showPassword[field.name] ? "text" : field.type;
            return (
              <Box key={field.name} sx={{ display: "flex", alignItems: "center", mt: 2, width: "25vw" }}>
                <Controller
                  name={field.name}
                  control={control}
                  rules={field.validation}
                  render={({ field: ctrl, fieldState: { error } }) => {
                    const rawValue = ctrl.value;
                    const displayValue = field.dataFormat && rawValue != null ? field.dataFormat(rawValue) : rawValue;
                    return (
                      <TextField
                        {...ctrl}
                        label={field.label}
                        value={displayValue}
                        select={field.type === "dropdown"}
                        multiline={field.type === "textArea"}
                        disabled={field.isDisabled}
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
                      >
                        {field.options &&
                          field.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                      </TextField>
                    );
                  }}
                />
              </Box>
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
          {onSubmit && (
            <Button type="submit" form="generic-form" color="primary" variant="contained">
              Valider
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GenericModal;
