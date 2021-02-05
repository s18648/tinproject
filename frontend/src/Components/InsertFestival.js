import React, { useState} from 'react';
import Axios from 'axios';
import './Component.css';


function InsertFestival() {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [nameStatus, setNameStatus] = useState('');
    const [startDateStatus, setStartStatus] = useState('');
    const [endDateStatus, setEndStatus] = useState('');
    const [errors, setErrors] = useState([]);

    const insert = () => {
        let nameValid = false;
        let startValid = false;
        let endValid = false;

        if(!(name.length <= 30)){
            setNameStatus("Festival name cannot be more than 30 characters");
        }else{
            nameValid = true;
            setNameStatus("");
        }
      
        let re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

        if(!(re.test(startDate))){
            setStartStatus("Date invalid: Must be 'yyyy-mm-dd");
        }else{
            startValid = true;
            setStartStatus("");
        }

        if(!(re.test(endDate))){
            setEndStatus("Date invalid: Must be 'yyyy-mm-dd");
        }else{
            endValid = true;
            setEndStatus("");
        }

        if (nameValid && startValid && endValid){
            try{
                Axios.post('http://localhost:4001/insertFestival', {name: name, startDate: startDate, endDate: endDate}).then((response) => {   
                if(response.data.errors){
                    setErrors([...response.data.errors]);
                }else{
                    setErrors([]);
                }
            });
            }
            catch(e){

            }

            setNameStatus("");
            setStartStatus("");
            setEndStatus("");
        }
    }

    return (
        <div className="container">
            <h1>Insert Festival</h1>
            <label>Festival Name</label>
            <input type="text" onChange={(e)=>
            {setName(e.target.value)}}/>
            <h1 className="error">{nameStatus}</h1>
            <label>Start Date</label>
            <input type="text" onChange={(e)=>
            {setStartDate(e.target.value)}}/>
            <h1 className="error">{startDateStatus}</h1>
            <label>End Date</label>
            <input type="text" onChange={(e)=>
            {setEndDate(e.target.value)}}/>
            <h1 className="error">{endDateStatus}</h1>
            <button onClick={insert}>Insert Festival</button>
            {errors.map(function(item, i){
                return <li key={i} className="error">{item.msg}</li>
            })}
      </div>            
    )
}

export default InsertFestival;
