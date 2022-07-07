import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import ElectionContract from "../contracts/Election.json";
import getWeb3 from "../utils/getWeb3";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  padding: "0px 15px"
}));

export default function Login() {

    const navigate = useNavigate();

    // const loadWeb3 = async () => {
    //     try {
    //         const web3 = await getWeb3();
    //         const accounts = await web3.eth.getAccounts();
    //         const networkId = await web3.eth.net.getId();
    //         const deployedNetwork = ElectionContract.networks[networkId];
    //         const instance = new web3.eth.Contract(
    //             ElectionContract.abi,
    //             deployedNetwork && deployedNetwork.address
    //         );
    //         setWeb3(web3);
    //         setCurrentAccount(accounts[0]);
    //         setContract(instance);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    const handleClick = () => {
        console.log("Login to metamask")
        navigate("/home");

    }

  return (
            <Container sx={{display: "flex", justifyContent:"center", alignItems:"center", height: "100vh", width: "100vw"}}>
                <Item elevation={4} onClick={handleClick}>
                  Sign in with metamask
                </Item>
            </Container>

  );
}