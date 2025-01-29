import React, { useState, useEffect } from "react";
import Web3 from "web3";
import UserStorage from "./contracts/UserStorage.json";
//import reportWebVitals from "./reportWebVitals";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = UserStorage.networks[networkId];
        const instance = new web3.eth.Contract(
          UserStorage.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(instance);

        const totalUsers = await instance.methods.getTotalUsers().call();
        const users = [];
        for (let i = 0; i < totalUsers; i++) {
          const user = await instance.methods.getUser(i).call();
          users.push(user);
        }
        setUsers(users);
      } else {
        alert("Please install MetaMask!");
      }
    };

    loadBlockchainData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      await contract.methods.addUser(name, age).send({ from: account });
      alert("User added to blockchain!");
      window.location.reload();
    }
  };

  return (
    <div>
      <h1>User Storage on Blockchain</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="pan"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
      <h2>Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            Name: {user.name}, Age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;