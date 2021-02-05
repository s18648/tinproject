import React, { useState} from 'react';
import Axios from 'axios';
import './Component.css';


function InsertPerformance() {
    const [idArtist, setIdArtist] = useState('');
    const [idFestival, setIdFestival] = useState('');
    const [performedSong, setPerformedSong] = useState('');
    const [artistStatus, setArtistStatus] = useState('');
    const [festivalStatus, setFestivalStatus] = useState('');
    const [songStatus, setSongStatus] = useState('');
    const [errors, setErrors] = useState([]);


    // const checkArtistId = () => {
    //     return idArtist >= 1;
    // }
   
    // const checkFestivalId = () => {
    //      return idFestival >= 1; 
    // }

    // const checkSong = () => {
    //     return performedSong.length <= 30;
    // }

    const insert = () => {
        let artistValid = false;
        let festivalValid = false;
        let songValid = false;

        if(!(idArtist >= 1)){
            setArtistStatus("Id artist cannot be 0 or less");
        }else{
            artistValid = true;
            setArtistStatus("");
        }
      
        if(!(idFestival >= 1)){
            setFestivalStatus("Id festival cannot be 0 or less");
        }else{
            festivalValid = true;
            setFestivalStatus("");
        }

        if(!(performedSong.length <= 30)){
            setSongStatus("Song name cannot be more than 30 characters");
        }else{
            songValid = true;
            setSongStatus("");
        }

        if (artistValid && festivalValid && songValid){
            try{
                Axios.post('http://localhost:4001/insertPerformance', {idartist: idArtist, idfestival: idFestival, song: performedSong}).then((response) => {   
                if(response.data.errors){
                    setErrors([...response.data.errors]);
                }else{
                    setErrors([]);
                }
            });
            }
            catch(e){

            }

            setArtistStatus("");
            setFestivalStatus("");
            setSongStatus("");
        }
    }

    return (
        <div className="container">
            <h1>Insert Performance</h1>
            <label>Id Artist</label>
            <input type="number" onChange={(e)=>
            {setIdArtist(e.target.value)}}/>
            <h1 className="error">{artistStatus}</h1>
            <label>Id Festival</label>
            <input type="number" onChange={(e)=>
            {setIdFestival(e.target.value)}}/>
            <h1 className="error">{festivalStatus}</h1>
            <label>Song name</label>
            <input type="text" onChange={(e)=>
            {setPerformedSong(e.target.value)}}/>
            <h1 className="error">{songStatus}</h1>
            <button onClick={insert}>Insert Performance</button>
            {errors.map(function(item, i){
                return <li key={i} className="error">{item.msg}</li>
            })}
      </div>            
    )
}

export default InsertPerformance;
