import { useEffect, useState } from "react";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./utils/getWeb3";

function App() {
  const [web3, setWeb3] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [vote, setVote] = useState(0);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    voteCandidate(vote);
  };

  const handleChange = (event) => {
    setVote(event.target.value);
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    getCandidates();
  }, [contract]);

  return (
    <div>
      <h1>{currentAccount}</h1>
      <h2>Candidates</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {candidates.map((candidate, index) => (
              <li key={index}>
                {candidate.name} - {candidate.votes} votes
              </li>
            ))}
          </ul>

          <h2> Vote </h2>
          <form onSubmit={handleSubmit}>
            <label>
              Candidate:
              <select value={vote} onChange={handleChange}>
                {candidates.map((candidate, index) => (
                  <option key={index} value={index}>
                    {candidate.name}
                  </option>
                ))}
              </select>
            </label>
            <button>Vote</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
