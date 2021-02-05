import React, {useState} from 'react';
import Axios from 'axios';

export default function ReadPerformance() {
    const [performanceDisplay, setPerformanceDisplay] = useState(false);
    const [performanceList, setPerformanceList] = useState([]);
    const [song, setSong] = useState('');
    const [songValidation, setSongValidation] = useState('');
    const [errors, setErrors] = useState([]);


    function showHideList(){
        setPerformanceDisplay(!performanceDisplay);

        if(!performanceDisplay){
            try{
                Axios.get('http://localhost:4001/readPerformance')
            .then((res) => {
                console.log(res)
                setPerformanceList([...res.data]);
            })
            }catch(e){
                console.log(e);
            }
        }
    }

    function updateSongName(id){
        if(song.length > 30){
            setSongValidation("Song cannot be more than 30 characters long");
        }else{
            Axios.put("http://localhost:4001/updatePerformance", {id: id, song: song}).then((res) => {
                if(res.data.errors){
                    setErrors([...res.data.errors]);
                }else{
                    setErrors([]);
                }}
            );

            showHideList();
            setSongValidation("");
        }
    }

    function deletePerformance(id){
        Axios.delete("http://localhost:4001/deletePerformance/" + id);

        showHideList();
    }

    return (
        <div>
            <button onClick={showHideList}>Display performance information</button>

            <p className="errorMessage">{songValidation}</p>
            {performanceDisplay ? (
                        performanceList.map((item, i) =>{
                            return <li  key={i}>Id Performance - {item.idperformance} <br/>
                            Id Artist - {item.idartist} <br/>
                            Id Festival - {item.idfestival} <br/> 
                            Song name - {item.performedsong} <br/> 
                            <label>Change song</label><br/>
                            <input type="text"  onChange={(e)=> {setSong(e.target.value)}}/>
                            <button onClick={() => updateSongName(item.idperformance)}>Update Name of Song</button><br/>
                            <button onClick={() => deletePerformance(item.idperformance)}>Delete performance</button><br/>
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
