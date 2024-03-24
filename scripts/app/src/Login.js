import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';

/*
        <div>
        <form>
        <input type="text" name="username"/>
        <input type="text" name="password"/>
        <button title="login" onClick={login}>
        </form>
        </div>
*/
function Login(props) {
    //Create your states here.
    const [pin, setPin] = useState();

    function login() {
        if (["1234", "2345", "3456", "4567", "5678", "6789"].includes(pin)) {
            props.setWalletAddress(pin);
        } else {
            alert("Incorrect Pin Entered.");
        }
        setPin("");
    }

    return (
        //Create your login component here.
        <div className="App">
            <header className="Title">
                <h1>Bible Buck Crypto Bank</h1>
            </header>
            <body>
                <div className="Login">
                    <h1 className="LoginTitle">Enter Secret Pin to Login</h1>
                    <div>
                        <form>
                            <input type="text" class="login-field" name="pin"
                                value={pin} onChange={(e) => setPin(e.target.value)} />
                        </form>
                    </div>
                    <div className="LoginButtonDiv">
                        <button type="submit" className="SubmitButton" onClick={login}>Login</button>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Login;