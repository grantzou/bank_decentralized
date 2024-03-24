import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'reactjs-popup/dist/index.css';

function Home(props) {
    //Create States here
    const [hist, setHist] = useState([]);
    const [bal, setBal] = useState();
    const [amount, setAmount] = useState();
    const [receiverAddress, setReceiverAddress] = useState();

    function logout() {
        props.setWalletAddress("");
        setBal("");
        setHist([]);
        setReceiverAddress("");
        setAmount("");
    }

    function refreshBalance() {
        const headers = { wallet: props.walletAddress };
        axios.get('/balance', { headers })
            .then((res) => {
                const response = res.data;
                setBal(response.amount);
            })
            .catch((err) => {
                if (err.response) {
                    console.err(err.response);
                    console.err(err.response.status);
                    console.err(err.response.headers);
                }
            });
    }

    function sendFunds() {
        // console.log('>>>', props.walletAddress, receiverAddress, amount)
        const headers = {
            wallet: props.walletAddress,
            sendTo: receiverAddress,
            amount
        };
        axios.get('/transfer', { headers })
            .then((res) => {
                if (res.status === 200) {
                    refreshBalance();
                    getTransaction();
                    alert('Transaction Successful');
                }
            })
            .catch((err) => {
                if (err.response) {
                    console.err(err.response);
                    console.err(err.response.status);
                    console.err(err.response.headers);
                }
                alert('Error!');
            });

    }

    function getTransaction() {
        const headers = { wallet: props.walletAddress };
        axios.get('/history', { headers })
            .then((res) => {
                const response = res.data;
                setHist(response.transactions);
            })
            .catch((err) => {
                if (err.response) {
                    console.err(err.response);
                    console.err(err.response.status);
                    console.err(err.response.headers);
                }
            }
            );
    }

    useEffect(() => {
        refreshBalance();
        getTransaction();
    }, [props.walletAddress]);

    return (
        //Create the dashboard component here.
        <div className="App">
            <header className="Title">
                <h1>Bible Buck Crypto Bank</h1>
                <div className="LogoutButtonDiv">
                    <button type="submit" className="SubmitButton" onClick={logout}>Logout</button>
                </div>
            </header>
            <body>
                <div className="GridContainer">
                    <div className="GridChild">
                        <h1 className="CardTitle">Account Balance</h1>
                        <div className="AccountBalance">
                            <p>{bal} $BB</p>
                            <button type="submit" className="RefreshButton" onClick={refreshBalance}>
                                <img
                                    src="refresh.png"
                                    alt="Refresh Button"
                                    height="16"
                                    width="16"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="GridChild">
                        <h1 className="CardTitle">Funds Transfer</h1>
                        <div class="form-style-3">
                            <form>
                                <label>
                                    <span>
                                        Wallet Address <span class="required">*</span>
                                    </span>
                                    <input type="text" class="input-field" name="receiverAddress"
                                        value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} />
                                </label>
                                <label>
                                    <span>Reason for Transaction</span>
                                    <select name="reason" class="select-field">
                                        <option value="Appointment">Online Purchases</option>
                                        <option value="Interview">Family Support</option>
                                        <option value="Regarding a post">Others</option>
                                    </select>
                                </label>
                                <label>
                                    <span>
                                        Amount <span class="required">*</span>
                                    </span>
                                    <input type="number" class="input-field" name="amount"
                                        value={amount} onChange={(e) => setAmount(e.target.value)} />
                                </label>
                            </form>
                        </div>
                        <div className="ButtonDiv">
                            <button type="submit" className="SubmitButton" onClick={sendFunds}>
                                Send Funds
                            </button>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="GridChild2">
                    <h1 className="CardTitle">Transaction History</h1>
                    ${hist && hist.map((tx, idx) => (
                        <div className="TransactionHistory">
                            <p>Transaction ID: {tx.id}</p>
                            <p>Amount: {tx.amount}</p>
                            <p>Transferred to: {tx.sendTo}</p>
                        </div>
                    ))}
                </div>
            </body>
        </div>
    );
}

export default Home;