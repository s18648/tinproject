import React, {useState} from 'react';
import Axios from 'axios';

export default function ReadFestivalSong() {
    const [comboDisplay, setComboDisplay] = useState(false);
    const [comboList, setComboList] = useState([]);


    function showHideList(){
        setComboDisplay(!comboDisplay);

        if(!comboDisplay){
            try{
                Axios.get('http://localhost:4001/readFestivalSong')
            .then((res) => {
                console.log(res)
                setComboList([...res.data]);
            })
            }catch(e){
                console.log(e);
            }
        }
    }

    return (
        <div>
            <button onClick={showHideList}>Display songs performed in festivals</button>

            {comboDisplay ? (
                        comboList.map((item, i) =>{
                            return <li  key={i}>Festival name - {item.name} <br/>
                            Festival Start Date - {item.StartDate.substring(0,10)} <br/>
                            Festival End Date - {item.EndDate.substring(0,10)} <br/>
                            Song Name - {item.PerformedSong} <br/> 
                            <hr/>
                            </li>
                        })
            ) : 
            <></>}
        </div>
    )
}
