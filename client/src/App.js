import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home.js';
import Auth from './pages/auth';
import CreateRecipe from './pages/createRecipe';
import SavedRecipes from './pages/savedRecipes';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth />}/>
          <Route path='/createrecipe' element={<CreateRecipe />}/>
          <Route path='/savedrecipes' element={<SavedRecipes />}/>
          
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
