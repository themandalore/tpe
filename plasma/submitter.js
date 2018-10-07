

const Web3 = require("web3");
const fs = require('fs');
const Tx = require('ethereumjs-tx')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
var json = require('../build/contracts/OracleToken.json');

_utxoPos = process.argv[2]
_token = process.argv[3]
_amount = process.argv[4]

console.log('Signature submitted ',signature)
  var address = process.argv[5];
  var abi = json.abi;
  var account = process.argv[6];
  var privateKey = new Buffer(process.argv[7], 'hex');
  web3.eth.getTransactionCount(account, function (err, nonce) {
    console.log(web3.toHex(solution))
    var data = web3.eth.contract(abi).at(address).rootChain.startDepositExit(_utxoPos,_token,_amount);
    console.log(data);
    //data = "0x42e0857f0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000038400000000000000000000000000000000000000000000000000000000000000092733343132333431270000000000000000000000000000000000000000000000"
    var tx = new Tx({
      nonce: nonce,
      gasPrice: web3.toHex(web3.toWei('20', 'gwei')),
      gasLimit: 4000000,
      to: address,
      value: 1234567890,
      data: data,
    });
    tx.sign(privateKey);

    var raw = '0x' + tx.serialize().toString('hex');
    web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
       console.log(transactionHash);
    });
  });
