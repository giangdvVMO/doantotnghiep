import './App.css';
import Nav from './components/Common/Navigation';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from './components/User/UserProvider';
import { useContext, useEffect } from 'react';
import {decodeToken , isExpired} from 'react-jwt';
import { serverURL } from './configs/server.config';
import { message } from 'antd';

function App() {
  const { user, changeUser , token, changeToken} = useContext(UserContext)
  console.log("accessTokenApp",token)
    const navigate = useNavigate();
    
    const checkToken = async()=>{
        if(isExpired(token)){
            navigate('/sign-in');
        }
    }
//     const fetchUser = async()=>{
//       console.log('fetch user account')
//       const tokenx = token? token: window.localStorage.getItem('accessToken');
//       console.log('tokenx', tokenx);
//       const id = decodeToken(tokenx).sub;
//       console.log("id",id);
//       const url = serverURL + 'account/'+id;
//           try {
//               const response = await fetch(url, {
//                   method: 'GET',
//                   headers: {
//                       'Content-Type': 'application/json',
//                   },
//               }
//               );
//               const result = await response.json();
//               if(response.status!==200){
//                   message.error("Lỗi hệ thống load user!");
//               }else{
//                   changeUser({...result})
//               }
//           }
//           catch (err) {
//               console.log(err);
//           }
//   }

  useEffect(()=>{checkToken()},[]);
//   useEffect(()=>{fetchUser()},[]);
  return (<div>
    <div className='App'>
      <Nav />
    </div>
    <Outlet />
  </div>
  );
}

export default App;
