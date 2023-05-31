import logo from './logo.svg';
import './App.css';
import ReservationForm from './ReservationForm';
import ReservationHost from './ReservationHost';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList'; 
import PropertyCard from './components/PropertyCard';
import PropertyPage from './PropertyPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HostPropertyList from './hostPropertyList';
import Login from './Login';
import NotificationList from './NotificationList';
import Register from './Register';
import ReservationUserList from './ReservationUserList';
import Properies from './PropertyList';
import CommentsForm from './comments'
import Update from './Update'
import Accounts from './Pages/accounts';
import UserID from './UserID'
import UserComments from './UserComments';

function App() {
  return (
    // <!--<div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
      
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element ={<Accounts/>}>
            <Route index element = {<Login/>}/>
            <Route path="/Register" element={<Register />}>
          </Route>
          <Route path="/update" element={<Update />}>
          </Route>
          {/* <Route path="/userid" element={<UserID />}>
          </Route> */}
          <Route path="/listOfReservations/:status?" element={<ReservationHost />} />
          <Route path="/userList" element={<ReservationUserList />}>
          </Route>
          <Route path="/reservationForm" element={<ReservationForm />}>
          </Route>
          <Route path="/notif" element={<NotificationList />}>
          </Route>
          <Route path="/Properties" element={<PropertyList />}>
          </Route>
          {/* <Route path="/comments" element={<CommentsForm />}>
          </Route> */}
          <Route path="/propertyForm" element={<PropertyForm />}>
          </Route>
          <Route path="/properties/your/" element={<HostPropertyList />} />
          {/* <Route path="/PropertyPage/:prop_id" element={<PropertyPage />} /> */}
          {/* <Route path="/" element> */}
          <Route path="/user/comments/" element={<UserComments />} />
          {/* </Route> */}
          </Route>    
        </Routes>
    </BrowserRouter>
  );
  
}

export default App;
