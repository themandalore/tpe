import React, { Component } from "react";
import ReactDOM from "react-dom";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";


class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  /*componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(SimpleStorageContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.set(5, { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.get();

    // Update state with the result.
    this.setState({ storageValue: response.toNumber() });
  };*/

  render() {
    /*if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }*/
    return (
      <div className="App">
      <div id="Navbar">
        <h1>Tokenized Plasma Exits!</h1>
        <h3>About Us</h3>
        <h3>How To</h3>
        </div>
        <div id="Orderbook">
        <p>Add the orderbook</p>
        </div>
        <div id="Portfolio">
        <p> Add your portfolio</p>
        </div>
        <div id="Graph">
        <p>Add a graph of the Ethereum Price</p>
        </div>
        <div id="Recent Trades">
        <p>Add a list of recent trades</p>
        </div>
      </div>
    );
  }
}

export default App;
