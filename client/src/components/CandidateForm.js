import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

export default function CandidateForm({ contract, web3, currentAccount }) {
  const [name, setName] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      await contract.methods.addCandidate(name).send({ from: currentAccount });
      console.log("candidate added");
    } catch (error) {
      console.log(error);
    }
    setName("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        width: "40%",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleForm}
    >
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Candiate Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <Button variant="contained" type="submit">
          Add Candiates
        </Button>
      </Stack>
    </Box>
  );
}
