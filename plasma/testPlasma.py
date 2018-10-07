import web3,json
from web3 import Web3
import requests,json, time,random
import pandas as pd
from Naked.toolshed.shell import execute_js, muterun_js, run_js
from multiprocessing import Process, freeze_support
import pytest
import rlp
from .transaction import Transaction, UnsignedTransaction
from .fixed_merkle import FixedMerkle
from .utils import confirm_tx, get_deposit_hash
from .transactions import encode_utxo_id, decode_utxo_id
from .constants import NULL_ADDRESS, NULL_ADDRESS_HEX


node_url ="http://localhost:8545" #https://rinkeby.infura.io/
net_id = 60 #eth network ID
last_block = 0

public_keys = ["0xe010ac6e0248790e08f42d5f697160dedf97e024","0xcdd8fa31af8475574b8909f135d510579a8087d3","0xb9dd5afd86547df817da2d0fb89334a6f8edd891","0x230570cd052f40e14c14a81038c6f3aa685d712b","0x3233afa02644ccd048587f8ba6e99b3c00a34dcc"]
private_keys = ["3a10b4bc1258e8bfefb95b498fb8c0f0cd6964a811eabca87df5630bcacd7216","d32132133e03be292495035cf32e0e2ce0227728ff7ec4ef5d47ec95097ceeed","d13dc98a245bd29193d5b41203a1d3a4ae564257d60e00d6f68d120ef6b796c5","4beaa6653cdcacc36e3c400ce286f2aefd59e2642c2f7f29804708a434dd7dbe","78c1c7e40057ea22a36a0185380ce04ba4f333919d1c5e2effaf0ae8d6431f14"]

static_jazz1 = "0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000"
static_jazz2 = "157465737441646470726f706f7365644f7261636c65"

def createSignature():
	pass

def startExit():
	contract_address = getAddress();
	block = getPlasmaBlock();
	while True:
		_utxoPos, _txBytes, _proof, _sigs = createSignature(block)
		arg_string =""+ str(_utxoPos) + " "+str(_txBytes)+" "+str(_proof)+" "+str(_sigs)+" "+str(contract_address)+" "+str(public_keys[miners_started])+" "+str(private_keys[miners_started])
		run_js('submitter.js',arg_string);
		console.log("Withdrawal Submitted");
		new_address = getAddress();
		if(contract_address != new_address):
				contract_address = new_address;
		else:
			block = getPlasmaBlock();
	print('Stopping Tests')

def jsonParser(_info):
	my_json = _info.content
	data = json.loads(my_json)
	s = json.dumps(data, indent=4, sort_keys=True)
	return json.loads(s)


def getPlasmaBlock():
	getAddress();
	print (contract_address)
	payload = {"jsonrpc":"2.0","id":net_id,"method":"eth_call","params":[{"to":contract_address,"data":"0x94aef022"}, "latest"]}
	r = requests.post(node_url, data=json.dumps(payload));
	val = r.content
	val2 = val[102:]
	val2 = val2[:-2]
	_challenge = val[34:101].decode("utf-8")
	val3 = bytes.decode(val2)
	_difficulty = int(val3);

	return _challenge,_difficulty;


def getAddress():
	global last_block
	payload = {"jsonrpc":"2.0","id":net_id,"method":"eth_blockNumber"}
	r = requests.post(node_url, data=json.dumps(payload));
	d = jsonParser(r);
	block = int(d['result'],16)
	i = 0;
	while(block > last_block):
		try:
			payload = {"jsonrpc":"2.0","id":net_id,"method":"eth_getTransactionByBlockNumberAndIndex","params":[hex(block),i]}
			i+=1;
			r = requests.post(node_url, data=json.dumps(payload));
			d = jsonParser(r);
			tx = d['result']
			payload = {"jsonrpc":"2.0","id":net_id,"method":"eth_getTransactionReceipt","params":[tx['hash']]}
			r = requests.post(node_url, data=json.dumps(payload));
			d = jsonParser(r);
			tx = d['result']
			try:
				logs =tx['logs'][0]['data']
				console.log('LOGS',logs);
				if static_jazz1 and static_jazz2 in logs:
					contract_address = logs.replace(static_jazz1,'').replace(static_jazz2,'').replace("000000000000000000000000000000000000000000000000000000000000000000000000000000000000",'')
					last_block = block 
					block = 0;
					print('New Contract Address',contract_address)
			except:
				pass
		except:
			block = block - 1;
			i=0

	return contract_address;

def bytes2int(str):
 return int(str.encode('hex'), 32)

def bytes_to_int(bytes):
    result = 0

    for b in bytes:
        result = result * 256 + int(b)

    return result

#working()
#getVariables()
#masterMiner();
#runInParallel(masterMiner,masterMiner,masterMiner,masterMiner,masterMiner)

#getAddress();