import React, { useEffect } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

const Menu = () => {
  const history = useNavigate();
  const location = useLocation();
  const profile = useSelector((state: any) => state.profile);
  useEffect(() => {
    console.log(history);
    console.log(location.state);
  }, [history, location]);

  return (
    <div className={`menu-bar ${profile.theme}`}>
      <NavLink to="/managerealm" className="navitem" activeClassName="active">
        Realm
      </NavLink>
      <NavLink to="/manageclient" className="navitem" activeClassName="active">
        Client
      </NavLink>
      <NavLink to="/blog" className="navitem" activeClassName="active">
        Blog
      </NavLink>
    </div>
  );
};

export default Menu;
