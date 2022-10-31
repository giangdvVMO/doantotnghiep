import './App.css';
import Nav from './components/Common/Navigation';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from './components/User/UserProvider';
import { useContext, useEffect } from 'react';
import {decodeToken , isExpired} from 'react-jwt';

function App() {
  const { user, changeUser , token, changeToken} = useContext(UserContext)
  console.log("accessTokenApp",token)
    const navigate = useNavigate();
    
    const checkToken = async()=>{
        if(isExpired(token)){
            navigate('/sign-in');
        }
    }
  useEffect(()=>{checkToken()},[]);
  return (<div>
    <div className='App'>
      <Nav />
    </div>
    <Outlet />
  </div>
  );
}

export default App;
