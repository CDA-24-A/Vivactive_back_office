import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Mot de passe:", mdp);
    // Ajoute ta logique d'authentification ici
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e3f2fd",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Connexion
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            required
            fullWidth
          />
        <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2, color: "white" }}
        >
        Se connecter
        </Button>

        </form>
      </Paper>
    </Box>
  );
};

export default Login;
