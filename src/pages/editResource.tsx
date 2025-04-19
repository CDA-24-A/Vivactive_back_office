// MyForm.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const MyForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Données du formulaire:", data);
    // Ici, tu peux envoyer les données à ton API ou les traiter selon tes besoins
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Formulaire d'inscription
        </Typography>

        {/* Prénom */}
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Le prénom est requis" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Prénom"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ""}
            />
          )}
        />

        {/* Nom */}
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Le nom est requis" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nom"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "L'email est requis",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "L'email n'est pas valide",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />

        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
          Envoyer
        </Button>
      </Box>
    </Container>
  );
};

export default MyForm;
