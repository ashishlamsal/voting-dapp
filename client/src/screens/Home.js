import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Vote from "./Vote";
import Admin from "./Admin";
import ElectionContract from "../contracts/Election.json";
import getWeb3 from "../utils/getWeb3";

export default function Home() {
  const [role, setRole] = useState(2);
  const [web3, setWeb3] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const getRole = async () => {
    if (contract) {
      // const role = await contract.methods.getRole().call();
      const role = 2;
      setRole(role);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    getRole();
  }, [contract]);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        height: "100vh",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          Loading...
        </Box>
      ) : (
        // <h1>Loading the page !!!</h1>
        <Box>
          {role === 1 && (
            <Admin
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
              // loading={loading}
            />
          )}

          {role === 2 && (
            <Vote
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
              // loading={loading}
            />
          )}

          {role === 0 && <h1>Unauthorised user</h1>}
        </Box>
      )}
    </Box>
  );
}
