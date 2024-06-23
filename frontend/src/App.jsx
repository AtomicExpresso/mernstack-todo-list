import './App.css';
import Home from './pages/Home';

import Navbar from './componets/Navbar';
import Footer from './componets/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home></Home>
      <Footer/>
    </div>
  );
}

export default App;
