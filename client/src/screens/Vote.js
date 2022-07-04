import { useEffect, useState } from "react";
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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

import Candidate from "../components/CandidateCard";

import ElectionContract from "../contracts/Election.json";
import getWeb3 from "../utils/getWeb3";


export default function Vote() {
    const [web3, setWeb3] = useState(null);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);
    const [vote, setVote] = useState(null);

    const [open, setOpen] = useState(false);

    let navigate = useNavigate();
    const courseEnroll = useSelector((state) => state.courseEnroll);
    const { errorStatus, loadingEnroll, enrollStatus } = courseEnroll;

    const loadWeb3 = async () => {
        try {
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = ElectionContract.networks[networkId];
          const instance = new web3.eth.Contract(
            ElectionContract.abi,
            deployedNetwork && deployedNetwork.address
          );
    
          setWeb3(web3);
          setCurrentAccount(accounts[0]);
          setContract(instance);
        } catch (error) {
          console.error("Error:", error);
        }
      };

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

    const voteCandidate = async (candidate) => {
        try {
            if (contract) {
                await contract.methods.vote(candidate).send({ from: currentAccount });
                getCandidates();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        loadWeb3();
        dispatch(CourseDetailAction(uid));
    }, []);
    
    useEffect(() => {
        getCandidates();
    }, [contract]);

    const handleVoteChange = (event) => {
        setVote(event.target.value);
    };
    
    const handleEnd = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleAgree = () => {
        console.log("Voting Done!!!");
        voteCandidate(vote);
    }

    return (
        <Box>

        <form onSubmit={handleEnd}>
            <Grid container>

                <Grid item xs={12}>
                    <Typography align="center" variant="h4">
                       Candidates
                    </Typography>
                    <Divider />
                </Grid>
    
                <Grid item xs={12}>
                    <FormControl>
                        <RadioGroup
                            row
                            sx={{overflowY:"hidden", overflowX:"auto", display: 'flex', width:"98vw"}}
                            value={vote}
                            onChange={handleVoteChange}
                        >
                            <div style={{display:"flex"}}>
                            {candidates.map((candidate, index) => (
                                <FormControlLabel
                                    labelPlacement="top" 
                                    control={<Radio />} 
                                    value={index}
                                    label={<Candidate id={index} name={candidate.name} />} 
                                />
                            ))}
                            </div>
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <div style={{margin: 20}}>
                        <Button 
                        type="submit"
                            variant="outlined" 
                            sx={{width: "100%"}}
                        >
                            Vote
                        </Button>
                    </div>
                </Grid>
        
            </Grid>

            </form>

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
              Do you want to submit your vote?
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
    );
}

