import logo from './logo.svg';
import './App.css';
import FetchNHLStats from './components/FetchNHLStats';

function App(props) {


  return (
    <div className="App">
      <div>
        <a href="https://www.nhl.com/standings/2021/wildcard">
          <img src={require('.//images/nhloldlogo.png')} className="img" alt="" />
        </a>
      </div>
      <FetchNHLStats />
    </div>
  );
}

export default App;
