import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/user/Dashboard';
import UserProfile from './components/user/UserProfile';
import WasteReportForm from './components/user/WasteReportForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <AppBarComponent />
        {/* <Profile/> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/report' element={<WasteReportForm />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/userdashboard' element={<Dashboard />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
