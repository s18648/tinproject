import React, {useState} from 'react';
import Axios from 'axios';

export default function ReadArtists() {
    const [artistDisplay, setArtistDisplay] = useState(false);
    const [artistList, setArtistList] = useState([]);
    const [age, setAge] = useState('');
    const [ageValidation, setAgeValidation] = useState('');
    const [errors, setErrors] = useState([]);

    function readData(){
        try{
            Axios.get('http://localhost:4001/readArtists')
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setArtistList([...res.data]);
        })
        }catch(e){
            console.log(e);
        }
    }

    function showHideList(){
        setArtistDisplay(!artistDisplay);

        if(!artistDisplay){
            readData();
        }
    }

    function updateArtistAge(id){
        if(age < 18){
            setAgeValidation("Age must be at least 18");
        }else{
            Axios.put("http://localhost:4001/updateArtist", {id: id, Age: age}).then((res) => {
                if(res.data.errors){
                    setErrors([...res.data.errors]);
                }else{
                    setErrors([]);
                }}
            );

            showHideList();
            setAgeValidation("");
        }
    }

    function deleteArtist(id){
        Axios.delete("http://localhost:4001/deleteArtist/" + id);

        showHideList();
    }

    return (
        <div>
            <button onClick={showHideList}>Display artist information</button>

            <p className="errorMessage">{ageValidation}</p>
            {artistDisplay ? (
                        artistList.map((item, i) =>{
                            return <li key={i}>Nickname - {item.Nickname} <br/> Age - {item.Age}<br/>
                            <label>Change age</label><br/>
                            <input type="number"  onChange={(e)=> {setAge(e.target.value)}}/>
                            <button onClick={() => updateArtistAge(item.IdArtist)}>Update Age of artist</button>
                            <button onClick={() => deleteArtist(item.IdArtist)}>Delete artist</button><br/>
                            <hr/>    
                            </li>
                        })
            ) : 
            <></>}
            {errors.map((item, i) => {
                return <li key={i} className="error">{item.msg}</li>
            })}
        </div>
    )
}
