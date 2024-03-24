from brownie import Bank, accounts
from brownie.network import gas_price
from brownie.network.gas.strategies import LinearScalingStrategy
import os

def main():
    gas_strategy = LinearScalingStrategy("60 gwei", "70 gwei", 1.1)
    gas_price(gas_strategy)
    addr = Bank.deploy({'from': accounts[0], 'gas_price': gas_strategy})
    f = open("./scripts/app/api/.env", "w")
    f.write("BANK_ADDRESS=" + str(addr))
    f.close()