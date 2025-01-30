let contract;
let web3;
const contractAddress = "0x9D0164D34b2386fFfC969EB8F17F6E06a182f2DC";

async function connectMetaMask() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const contractABI = [
      {
        inputs: [
          { internalType: "string", name: "_name", type: "string" },
          { internalType: "string", name: "_aadhaar", type: "string" },
          { internalType: "string", name: "_pan", type: "string" },
          { internalType: "string", name: "_description", type: "string" },
        ],
        name: "fileReport",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("Connected to contract", contract);
  } else {
    alert("Please install MetaMask!");
  }
}

async function submitReport() {
  const name = document.getElementById("name").value;
  const aadhaar = document.getElementById("aadhaar").value;
  const pan = document.getElementById("pan").value;
  const description = document.getElementById("description").value;

  const accounts = await web3.eth.getAccounts();
  await contract.methods
    .fileReport(name, aadhaar, pan, description)
    .send({ from: accounts[0] });

  alert("Report Submitted Successfully!");
}

connectMetaMask();
