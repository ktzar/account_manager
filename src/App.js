import React, { useEffect, useState } from 'react';
import './App.css';
import { Account } from './Account';

const API_URL = 'https://gist.githubusercontent.com/amirmohsen/314d19af6482028469b17ff858228133/raw/b5bb4ff490c266f1ca5a4d6b54548046b768f542/vf-test-mock-api.json';

const fetchData = async () => {
    const resp = await fetch(API_URL);
    const data = await resp.json();
    return data.sort((a, b) => a.dob < b.dob ? 1 : -1);
}


function App() {
    const [ accounts, setAccounts ] = useState([]);
    const [ error, setError ] = useState(false);

    const updateAccount = ({fields}) => {
        setAccounts(accounts.map(a => a.id === fields.id ? fields : a));
    };

    useEffect(() => {
        (async () => {
            try {
                setAccounts(await fetchData());
            } catch (e) {
                setError(true);
            }
        })()
    }, []);

    return (
        <div className="App">
            { error && <div>There was an error</div>}
            { !error && accounts.length === 0 && <div>Loading...</div> }
            { accounts.map((acc) => <Account key={acc.id} onEdit={updateAccount} data={acc} />) }
        </div>
    );
}

export default App;
