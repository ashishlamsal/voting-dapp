import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Candidate from '../components/CandidateCard';

// import ElectionContract from "../contracts/Election.json";
// import getWeb3 from "../utils/getWeb3";


export default function Admin({role, contract, web3, currentAccount}) {
    // const [web3, setWeb3] = useState(null);
    // const [currentAccount, setCurrentAccount] = useState(null);
    // const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);

    const [open, setOpen] = useState(false);

    // const loadWeb3 = async () => {
    //   try {
    //     const web3 = await getWeb3();
    //     const accounts = await web3.eth.getAccounts();
    //     const networkId = await web3.eth.net.getId();
    //     const deployedNetwork = ElectionContract.networks[networkId];
    //     const instance = new web3.eth.Contract(
    //       ElectionContract.abi,
    //       deployedNetwork && deployedNetwork.address
    //     );
  
    //     setWeb3(web3);
    //     setCurrentAccount(accounts[0]);
    //     setContract(instance);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };

  const getCandidates = async () => {
      if (contract) {
          const count = await contract.methods.candidatesCount().call();
          const temp = [];
          for (let i = 0; i < count; i++) {
              const candidate = await contract.methods.getCandidateDetails(i).call();
              temp.push({ name: candidate[0], votes: candidate[1] });
          }
          setCandidates(temp);
          setLoading(false);
      }
  };

    // useEffect(() => {
    //     loadWeb3();
    // }, []);

    useEffect(() => {
        getCandidates();
    }, [contract]);

    const handleEnd = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleAgree = () => {
        console.log("Ending Election");
    }

    return (
        <Box>
            { loading ? (
                <h1>Loading the page !!!</h1>
            ) : (
            <Box>
                <Grid container>
                    <Grid item xs={12}>
                        <div style={{margin: 20}}>
                            <Button 
                                variant="outlined" 
                                sx={{width: "100%"}}
                                onClick={handleEnd}
                            >
                                End Election
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography align="center" variant="h4">
                            Vote Count
                        </Typography>
                        <Divider />
                    </Grid>
        
                    <Grid item xs={12}>
                        {candidates.map((candidate, index) => (
                                    <Candidate id={index} name={candidate.name} voteCount={candidate.votes} />
                                ))}
                    </Grid>
            
                </Grid>

                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Do you want to end the election?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree} autoFocus>
                    Agree
                    </Button>
                </DialogActions>
                </Dialog>
            </Box>
            )}
        </Box>
    );
}


