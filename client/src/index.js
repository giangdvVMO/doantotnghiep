import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignIn from './components/User/SignIn';
import SignUp from './components/User/SignUp';
import { UserProvider } from './components/User/UserProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './components/Common/PageNotFound';
import { Home } from './components/Common/Home';
import { News } from './components/Common/News';
import { About } from './components/Common/About'
import { DetailAccount } from './components/User/DetailAccount';
import { StudentProfile } from './components/Student/StudentProfile';
import { CompanyProfile } from './components/Company/CompanyProfile';
import { AccountManager } from './components/Admin/AccountManager';
import { DetailAccountAdmin } from './components/Admin/DetailAccountAdmin';
import { StudentManager } from './components/Admin/StudentManager';
import { StudentDetailAdmin } from './components/Admin/StudentDetail';
import { StudentDetailCompany } from './components/Company/StudentDetailCompany';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path="/" element={<App />} >
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="about" element={<About />} />
          <Route path="myaccount" element={<DetailAccount />} />
          <Route path='student-profile' element={<StudentProfile />} />
          <Route path='company-profile' element={<CompanyProfile />} />
          <Route path='account-management' element={<AccountManager />} />
          <Route path='account/:id'  element={<DetailAccountAdmin />} />
          <Route path='student-management' element={<StudentManager />} />
          <Route path='admin'>
            <Route path='student/:id' element={<StudentDetailAdmin/>}/>
          </Route>
          <Route path='company'>
            <Route path='student/:id' element={<StudentDetailCompany/>}/>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
