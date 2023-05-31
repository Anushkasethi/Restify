
import { Outlet, Link } from 'react-router-dom';
import './index.css';

const Accounts = () => {
  return (
    <>
      <header className="header">
        <div className="logo">RESTIFY</div>
        <nav className="nav">
          <Link to="/">Login</Link>
          {/* <Link to='/userid'>USERID</Link> */}
          <Link to="/register">Register</Link>
          <Link to="/update">Update</Link>
          <Link to="/reservationForm">ReservationForm</Link>
          <Link to="/userList">UserList</Link>
          <Link to="/listOfReservations/:status?">HostList</Link>
          <Link to="/notif">Notifications</Link>
          <Link to="/propertyForm">AddProperty</Link>
          <Link to="/Properties">Properties</Link>
          <Link to="/properties/your/">HostProp</Link>
          <Link to="/user/comments/">UserComments</Link>
          {/* <Link to="/PropertyPage/:prop_id">pageProp</Link> */}

        </nav>
      </header>
      <Outlet />
      
    </>
  );
};

export default Accounts;
