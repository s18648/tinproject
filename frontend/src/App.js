import './App.css';
import ReadArtists from "./Components/ReadArtists";
import ReadFestival from "./Components/ReadFestival";
import ReadPerformance from "./Components/ReadPerformance";
import ReadArtistSong from "./Components/ReadArtistSong";
import ReadFestivalSong from "./Components/ReadFestivalSong";
import ReadFullInformation from "./Components/ReadFullInformation";
import InsertArtist from "./Components/InsertArtist";
import InsertFestival from "./Components/InsertFestival";
import InsertPerformance from "./Components/InsertPerformance";
import Axios from 'axios';

function App() {
  Axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <h1>Reading-Updating-Deleting</h1>
      <ReadArtists />
      <ReadFestival />
      <ReadPerformance />
      <ReadArtistSong />
      <ReadFestivalSong />
      <ReadFullInformation />
      <InsertArtist />
      <InsertFestival />
      <InsertPerformance />
    </div>
  );
}

export default App;
