import React, { useState} from 'react';
import Axios from 'axios';
import './Component.css';


function InsertArtist() {
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState('');
    const [nicknameStatus, setNicknameStatus] = useState('');
    const [ageStatus, setAgeStatus] = useState('');
    const [errors, setErrors] = useState([]);

    const insert = () => {
        let nameValid = false;
        let ageValid = false;

        if(!(nickname.length <= 30)){
            setNicknameStatus("Nickname cannot be more than 30 characters");
        }else{
            nameValid = true;
            setNicknameStatus("");
        }
      
        if((age < 18)){
            setAgeStatus("Age cannot be 17 or less");
        }else{
            ageValid = true;
            setAgeStatus("");
        }

        if (nameValid && ageValid){
            try{
                Axios.post('http://localhost:4001/insertArtist', {nickname: nickname, age: age}).then((response) => {   
                if(response.data.errors){
                    setErrors([...response.data.errors]);
                }else{
                    setErrors([]);
                }
            });
            }
            catch(e){

            }

            setNicknameStatus("");
            setAgeStatus("");
        }
    }

    return (
        <div className="container">
            <h1>Insert Artist</h1>
            <label>Artist Name</label>
            <input type="text" onChange={(e)=>
            {setNickname(e.target.value)}}/>
            <h1 className="error">{nicknameStatus}</h1>
            <label>Artist Age</label>
            <input type="number" onChange={(e)=>
            {setAge(e.target.value)}}/>
            <h1 className="error">{ageStatus}</h1>
            <button onClick={insert}>Insert Artist</button>
            {errors.map(function(item, i){
                return <li key={i} className="error">{item.msg}</li>
            })}
      </div>            
    )
}

export default InsertArtist;
