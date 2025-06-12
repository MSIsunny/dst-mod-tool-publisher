import logo from './app_logo.png';
import './App.css';
import app_data from './app-data.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className='Title'>
          dst-mod-tool-v{app_data.version}
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <div className='Link-container'>

            <a
            className="App-link"
            href={`https://github.com/MSIsunny/dst-mod-tool-publisher/releases/download/dst-mod-tool-v${app_data.version}/win-dst-mod-tool.zip`}
            target="_blank"
            rel="noopener noreferrer"
            >
            Windows Download
            </a>

            <a
            className="App-link"
            href={`https://github.com/MSIsunny/dst-mod-tool-publisher/releases/download/dst-mod-tool-v${app_data.version}/macos-dst-mod-tool.zip`}
            target="_blank"
            rel="noopener noreferrer"
            >
            MacOS Download
            </a>
            
        </div>
      </header>
    </div>
  );
}

export default App;
