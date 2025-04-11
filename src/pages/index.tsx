import { Box } from "@mui/material";
import useFetch from "../hooks/useFetch";
import useCitizens from "../hooks/useCitizens";
import { useEffect } from "react";

const Index = () => {
  const { fetchCitizens, citizens, loading, error } = useCitizens();

  useEffect(() => {
    fetchCitizens();
    console.log(citizens);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <h1>Welcome to React.Js!</h1>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
      <p>This is a simple React.Js application.</p>
    </Box>
  );
};
export default Index;
