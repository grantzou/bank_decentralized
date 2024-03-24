import React, { useState } from 'react'
import Home from "./Home";
import Login from "./Login";
import './App.css';


function App() {
    //Create your states here.
    const [walletAddress, setWalletAddress] = useState();

    return (
        //Create your conditional component here for routing.
        <div>
            {walletAddress ? (<Home setWalletAddress={setWalletAddress} walletAddress={walletAddress} />) : (<Login setWalletAddress={setWalletAddress} />)};
        </div>
    );
}

export default App;
