import React, {useState} from 'react';
import Axios from 'axios';

export default function ReadFestival() {
    const [festivalDisplay, setFestivalDisplay] = useState(false);
    const [festivalList, setFestivalList] = useState([]);
    const [name, setName] = useState('');
    const [nameValidation, setNameValidation] = useState('');
    const [errors, setErrors] = useState([]);


    function showHideList(){
        setFestivalDisplay(!festivalDisplay);

        if(!festivalDisplay){
            try{
                Axios.get('http://localhost:4001/readFestivals')
            .then((res) => {
                console.log(res)
                setFestivalList([...res.data]);
            })
            }catch(e){
                console.log(e);
            }
        }
    }

    function updateFestivalName(id){
        if(name.length > 30){
            setNameValidation("Name cannot be more than 30 characters long");
        }else{
            Axios.put("http://localhost:4001/updateFestival", {id: id, name: name}).then((res) => {
                if(res.data.errors){
                    setErrors([...res.data.errors]);
                }else{
                    setErrors([]);
                }}
            );

            showHideList();
            setNameValidation("");
        }
    }

    function deleteFestival(id){

        Axios.delete("http://localhost:4001/deleteFestival/" + id);

        showHideList();
    }

    return (
        <div>
            <button onClick={showHideList}>Display festival information</button>

            <p className="errorMessage">{nameValidation}</p>
            {festivalDisplay ? (
                        festivalList.map((item, i) =>{
                            return <li  key={i}>Name - {item.Name} <br/> 
                            <label>Change name</label><br/>
                            <input type="text"  onChange={(e)=> {setName(e.target.value)}}/>
                            <button onClick={() => updateFestivalName(item.IdFestival)}>Update Name of Festival</button><br/>
                            Start Date - {item.StartDate.substring(0,10)}<br/>
                            <br/> End Date - {item.EndDate.substring(0,10)}<br/>
                            <button onClick={() => deleteFestival(item.IdFestival)}>Delete festival</button><br/>
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
