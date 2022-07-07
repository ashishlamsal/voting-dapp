// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

contract Election {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    address private owner;

    struct Voter {
        uint256 id;
        string name;
    }

    mapping(uint256 => Candidate) candidates;
    mapping(address => bool) voted;

    mapping(address => bool) isVoter;

    uint256 public candidatesCount = 0;

    uint256 public votersCount = 0;

    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    event Voted(uint256 indexed _candidateId);

    function addCandidate(string memory _name) private {
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        candidatesCount++;
    }

    function addVoter(address _voter) public {
        require(owner==msg.sender, "Only owner can add voter");
        isVoter[_voter] = true;
    }

    function vote(uint256 _candidateId) public {
        require(isVoter[msg.sender], "Non authorised user cannot vote");
        require(!voted[msg.sender], "You have already voted");
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "Invalid candidate ID"
        );

        candidates[_candidateId].voteCount++;
        voted[msg.sender] = true;

        emit Voted(_candidateId);
    }

    function getCandidateDetails(uint256 _candidateId)
        public
        view
        returns (string memory, uint256)
    {
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "Invalid candidate ID"
        );
        return (
            candidates[_candidateId].name,
            candidates[_candidateId].voteCount
        );
    }
}
