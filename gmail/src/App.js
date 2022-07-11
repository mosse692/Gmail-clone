import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { Routes, Route } from "react-router-dom";
import Mail from './Mail'
import EmailList from './EmailList'
import SendMail from './SendMail';
import { useDispatch, useSelector } from 'react-redux'
import { selectSendMessageIsOpen } from './features/mailSlice';
import { login, selectUser } from './features/userSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {

  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user) {
        //user is logged in
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        }))
      }
    })
  }, [dispatch])

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <Header />
          <div className='app__body'>
            <Sidebar />
            <Routes>
              <Route path='/mail' element={<Mail />} />
              <Route path='/' element={<EmailList />} />
            </Routes>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}

    </Router>

  );
}

export default App;
