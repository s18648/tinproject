import React, {useState} from 'react';
import Axios from 'axios';

export default function ReadFullInformation() {
    const [comboDisplay, setComboDisplay] = useState(false);
    const [comboList, setComboList] = useState([]);


    function showHideList(){
        setComboDisplay(!comboDisplay);

        if(!comboDisplay){
            try{
                Axios.get('http://localhost:4001/readFullInformation')
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
            <button onClick={showHideList}>Display full information for artists, festivals and performances</button>

            {comboDisplay ? (
                        comboList.map((item, i) =>{
                            return <li  key={i}>Arist ID - {item.IdArtist} <br/>
                            Artist Nick Name - {item.Nickname} <br/>
                            Artist Age - {item.Age} <br/>
                            Festival ID - {item.IdFestival} <br/>
                            Festival Name - {item.Name} <br/>
                            Festival Start Date- {item.StartDate.substring(0,10)} <br/>
                            Festival End Date- {item.EndDate.substring(0,10)} <br/>
                            Performance ID - {item.IdPerformance} <br/>
                            Song Name - {item.PerformedSong} <br/>
                            <hr/>
                            </li>
                        })
            ) : 
            <></>}
        </div>
    )
}
