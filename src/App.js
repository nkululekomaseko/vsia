import './App.css'
import Map from './components/map/Map';
import Header from './components/header/Header';
import MlabContainer from './components/mlab/MlabContainer';


const App = () => {

  return (
    <div className="App">
      <Header />
      <Map />
    </div>
  );
}

export default App;
