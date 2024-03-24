#Create your api script here to handle GET requests.
import json
import os

from flask import Flask, render_template, request
from web3 import Web3, HTTPProvider

app = Flask(__name__)

w3 = Web3(HTTPProvider('http://127.0.0.1:8545'))
f = open('/Users/grantzou/dev/blockchain/bank_decentralized_react_flask/build/contracts/Bank.json')
data = json.load(f)
abi = data['abi']

address = os.getenv('BANK_ADDRESS')
print("BANK IS DEPLOYED AT: ", address)
# address = '0x3194cBDC3dbcd3E11a07892e7bA5c3394048Cc87'

contract = w3.eth.contract(address=address, abi=abi)

contract.functions.deposit_funds().transact({'from': w3.eth.accounts[0], 'value': 1000})
# contract.functions.deposit_funds().transact({'from': w3.eth.accounts[1], 'value': 200})
# contract.functions.deposit_funds().transact({'from': w3.eth.accounts[2], 'value': 300})
# contract.functions.deposit_funds().transact({'from': w3.eth.accounts[3], 'value': 400})
# contract.functions.deposit_funds().transact({'from': w3.eth.accounts[4], 'value': 500})
# contract.functions.deposit_funds().transact({'from': w3.eth.accounts[5], 'value': 600})
# tx = contract.functions.transfer_funds(w3.eth.accounts[2], 25).transact({'from': w3.eth.accounts[1]})
# tx = contract.functions.transfer_funds(w3.eth.accounts[2], 25).transact({'from': w3.eth.accounts[3]})

print("PRINTING WALLET NUMBERS")
print("ACCOUNT 1: ", w3.eth.accounts[0])
print("ACCOUNT 2: ", w3.eth.accounts[1])
print("ACCOUNT 3: ", w3.eth.accounts[2])
print("ACCOUNT 4: ", w3.eth.accounts[3])
print("ACCOUNT 5: ", w3.eth.accounts[4])
print("ACCOUNT 6: ", w3.eth.accounts[5])

accs = {
    '1234' : 0,
    '2345' : 1,
    '3456' : 2,
    '4567' : 3,
    '5678' : 4,
    '6789' : 5
}

@app.route('/balance')
def get_balance():
    acc_num = accs[request.headers['wallet']]
    balance = contract.functions.get_balance().call({'from': w3.eth.accounts[acc_num]})
    return {'amount': balance}


@app.route('/history')
def get_history():
    transactions = []
    acc_num = accs[request.headers['wallet']]
    blocks = contract.functions.get_blocks().call({'from': w3.eth.accounts[acc_num]})
    for num in blocks:
        block = w3.eth.get_block(num)
        tx = w3.eth.getTransaction(block.transactions[0])
        cd = contract.decode_function_input(tx.input)
        if str(cd[0]) == '<Function transfer_funds(address,uint256)>':
            transactions.append({'id': str(tx.blockNumber), 'amount': str(cd[1]['_funds']), 'sendTo': str(cd[1]['receiving_address'])})
            
    return {'transactions': transactions}


@app.route('/transfer')
def funds_transfer():
    print(request.headers)
    sender_num = accs[request.headers['wallet']]
    rec_num = request.headers['sendTo']
    amount = int(request.headers['amount'])
    tx = contract.functions.transfer_funds(rec_num, amount).transact({'from': w3.eth.accounts[sender_num]})
    return {'status': True}