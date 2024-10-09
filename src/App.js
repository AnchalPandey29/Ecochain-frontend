import './App.css';
import{BrowserRouter,Route,Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';

function App() {
  return (
    <>
    

    <BrowserRouter>
    <AppBarComponent/>
    <Profile/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>

    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
