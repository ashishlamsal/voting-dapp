import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Candidate from "../components/CandidateCard";

// import ElectionContract from "../contracts/Election.json";
// import getWeb3 from "../utils/getWeb3";


export default function Vote({role, contract, web3, currentAccount}) {
    // const [web3, setWeb3] = useState(null);
    // const [currentAccount, setCurrentAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);
    const [vote, setVote] = useState(null);

    const [open, setOpen] = useState(false);


    // const loadWeb3 = async () => {
    //     try {
    //       const web3 = await getWeb3();
    //       const accounts = await web3.eth.getAccounts();
    //       const networkId = await web3.eth.net.getId();
    //       const deployedNetwork = ElectionContract.networks[networkId];
    //       const instance = new web3.eth.Contract(
    //         ElectionContract.abi,
    //         deployedNetwork && deployedNetwork.address
    //       );
    //       console.log(web3);

    //       console.log(accounts)

    //       console.log(networkId)
    //       console.log(deployedNetwork)
    //       console.log(instance)
    
    //       setWeb3(web3);
    //       setCurrentAccount(accounts[0]);
    //       setContract(instance);
    //     } catch (error) {
    //       console.error("Error:", error);
    //     }
    //   };

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

    // useEffect(() => {
    //     loadWeb3();
    // }, []);
    
    useEffect(() => {
        getCandidates();
    }, [contract]);

    const handleVoteChange = (event) => {
        setVote(event.target.value);
    };
    
    const handleVote = () => {
        voteCandidate(vote);
    };

    return (
        <Box>
            { loading ? (
                <h1>Loading the page !!!</h1>
            ) : (
            <Box>
                <form onSubmit={handleVote}>
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
                                            key={index}
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
            </Box>
            )}
        
        </Box>
    );
}


