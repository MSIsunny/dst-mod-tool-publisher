import logo from './app_logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className='Title'>
          dst-mod-tool-v0.1.0
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <div className='Link-container'>

            <a
            className="App-link"
            href="https://github.com/MSIsunny/dst-mod-tool-publisher/releases/download/dst-mod-tool-v0.1.0/win-dst-mod-tool.exe.zip"
            target="_blank"
            rel="noopener noreferrer"
            >
            Windows Download
            </a>

            <a
            className="App-link"
            href="https://github.com/MSIsunny/dst-mod-tool-publisher/releases/download/dst-mod-tool-v0.1.0/macos-dst-mod-tool.zip"
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
