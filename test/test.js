/** This contract tests the typical workflow from the dApp 
* (user contract, cash out)
*/
var RootChain= artifacts.require("./RootChain.sol");
var PlasmaToken = artifacts.require("./PlasmaToken.sol");

function promisifyLogWatch(_event) {
  return new Promise((resolve, reject) => {
    _event.watch((error, log) => {
      _event.stopWatching();
      if (error !== null)
        reject(error);
      resolve(log);
    });
    });
}

contract('Mining Tests', function(accounts) {
  let rootChain;
  let plasmaToken;

    beforeEach('Setup contract for each test', async function () {
        rootChain = await RootChain.new();
        console.log('Start the testPlasma.py!!')
    });
    it("Test Plasma Deposit", async function(){
        vars = await rootChain.deposit({value:1e18});
        assert(web3.fromWei(web3.eth.getBalance(rootChain.address), 'ether').toFixed(0) == 1);
    }); 
    it("Test Token Issuance", async function(){
        vars = await rootChain.deposit({from:accounts[1],value:1e18});
        logNewValueWatcher = await promisifyLogWatch(rootChain.ExitStarted({ fromBlock: 'latest' }));//or Event Mine?
        res = logMineWatcher.args.new_token;
        plasmaToken = await PlasmaToken.at(res);
        assert(plsasmaToken.balanceOf(accounts[1]) == 1e18);
    }); 
    // it("Test Withdrawal No Transfers", async function(){
    //     vars = await oracletoken.getVariables();
    //     assert(vars[1] == 1);
    // }); 
    // it("Test Two Withdrawals in one Final Exit", async function () {
    //     console.log('START MINING RIG!!');
    //     logNewValueWatcher = await promisifyLogWatch(oracletoken.NewValue({ fromBlock: 'latest' }));//or Event Mine?
    // });
    // it("Test 20 token holders", async function () {
    //     logMineWatcher = await promisifyLogWatch(oracletoken.Mine({ fromBlock: 'latest' }));//or Event Mine?
    //     assert(logMineWatcher.args._value > 0);
    // });
    // it("Test 10 token holders and five withdrawals in one final exit", async function () {
    //     for(var i = 0;i < 10;i++){
    //         logMineWatcher = await promisifyLogWatch(oracletoken.Mine({ fromBlock: 'latest' }));//or Event Mine?
    //         console.log('Mining...',i);
    //     }
    //     res = logMineWatcher.args._value;
    //     assert(res > 0);
    // });

});