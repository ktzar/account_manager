import React, { useState, useCallback } from 'react';
import { format, subYears } from 'date-fns'
import formatISO from 'date-fns/formatISO'

const titles = [ "Mr", "Mrs", "Miss", "Ms", "Dr", "Prof" ];
const startDate = formatISO(subYears(new Date(), 100), {representation: 'date'});
const endDate = formatISO(new Date(), {representation: 'date'});
console.log({startDate, endDate});

const reducer = (state, action) => {
    return { ... state};
};

export const Account = ({data, onEdit}) => {
    const [editing, setEditing] = useState(false);
    const [fields, setFields] = useState(data);

    const formattedDate = format(new Date(fields.dob), 'dd/MM/yyyy');

    const changeField = useCallback((evt) => {
        const { name, value } = evt.target;
        const newFields = {
            ...fields,
            [name]: value
        }; 
        setFields(newFields);
    }, [fields, setFields]);

    if (editing) {
        return (
            <form>
                <h2>User panel</h2>
                <div>
                    <label>Title</label> <select name="title" value={fields.title} onChange={changeField}>
                        { titles.map(t => <option key={t} value={t}>{t}</option>) }
                    </select>
                </div>
                <div>
                    <label for="firstName">First Name</label>
                    <input id="firstName" onChange={changeField} name="firstName" value={fields.firstName} />
                </div>
                <div>
                    <label for="lastName">Last Name</label>
                    <input id="lastName" onChange={changeField} name="lastName" value={fields.lastName} />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" name="dob"
                        value={fields.dob}
                        onChange={changeField} 
                        min={startDate} max={endDate} />
                </div>

                <button onClick={() => {
                    onEdit({fields});
                    setEditing(false);
                }}>Save</button>
            </form>
        );
    }

    return (
        <>
            <h2>User panel</h2>
            <ul>
                <li><strong>Name: </strong>{data.title}. {data.firstName} {data.lastName}</li>
                <li><strong>Date of Birth: </strong>{formattedDate}</li>
            </ul>
            <button onClick={() => {setEditing(true)}}>Edit</button>
        </>
    );
};
