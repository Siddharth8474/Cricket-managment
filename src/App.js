import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <Container>
      <Header/>
      <Outlet/>
      </Container>
    </div>
  );
}

export default App;
