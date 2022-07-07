// import { useState } from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";

// const Input = styled("input")({
//   display: "none",
// });

// export default function CandidateForm() {
//   //({role, contract, web3, currentAccount}) {
//   const [name, setName] = useState("");
//   const [file, setFile] = useState(null);

//   const handleForm = async () => {
//     console.log("handleForm");
//     await contract.methods.addCandidate(name).call();
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   return (
//     <Box>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           Candidate Form
//         </Grid>

//         <Grid item xs={12}>
//           <label htmlFor="contained-button-file">
//             <Input
//               accept="image/*"
//               id="contained-button-file"
//               onChange={handleFileChange}
//             />
//             <Button variant="contained" component="span">
//               Upload Candidate List
//             </Button>
//           </label>
//         </Grid>

//         <Grid item xs={12}>
//           <form onSubmit={handleForm}>
//             <TextField
//               id="outlined-basic"
//               label="Candidate Name"
//               variant="outlined"
//               value={name}
//               onChange={handleNameChange}
//             />
//             <Button variant="contained" type="submit">
//               {" "}
//               Submit{" "}
//             </Button>
//           </form>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
