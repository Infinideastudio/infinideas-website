import React from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import {API_BASE} from "./Settings";

const App = ()=> {
    const cookies = new Cookies();
    const history = useHistory();
    if (cookies.get("credential"))
        history.push("/admin");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');

    const login = () => {
        fetch(API_BASE + "/auth/password", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'u': username,
                'p': password
            })
        }).then((response) => {
            if(response.status !== 200) throw new Error(response.statusText);
            return response.json();
        }).then((data) => {
            if(data.s!==9000) throw new Error("Username or password incorrect");
            cookies.set("credential", data.p, {path: '/'});
            history.push("/admin");
        }).catch((err) => {
            setResult("Login Failed: " + err.toString());
        });
    };


    return (
        <div style={{"textAlign": "center", "marginTop": "10%"}}>
            <p><input type="text" placeholder="Enter Username" name="username" onInput={e => setUsername(e.target.value)} required/></p>
            <p><input type="password" placeholder="Enter Password" name="password" onInput={e => setPassword(e.target.value)} required/></p>
            <p><button type="submit" onClick={login}>Login</button></p>
            <p>{result}</p>
        </div>
    );

};

export default App;
