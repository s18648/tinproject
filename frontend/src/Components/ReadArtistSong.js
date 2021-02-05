import React, {useState} from 'react';
import Axios from 'axios';

export default function ReadArtistSong() {
    const [comboDisplay, setComboDisplay] = useState(false);
    const [comboList, setComboList] = useState([]);


    function showHideList(){
        setComboDisplay(!comboDisplay);

        if(!comboDisplay){
            try{
                Axios.get('http://localhost:4001/readArtistSong')
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
            <button onClick={showHideList}>Display songs performed by artists</button>

            {comboDisplay ? (
                        comboList.map((item, i) =>{
                            return <li  key={i}>Artist Nick name - {item.Nickname} <br/>
                            Artist Age - {item.Age} <br/>
                            Song Name - {item.PerformedSong} <br/> 
                            <hr/>
                            </li>
                        })
            ) : 
            <></>}
        </div>
    )
}
