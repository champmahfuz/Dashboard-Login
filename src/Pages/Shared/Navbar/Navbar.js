import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const logout = () => {
        signOut(auth)
    };
    return (
        <div>
            <div>
                <Link to="/"><button className="btn btn-ghost">Home</button> </Link>
                <Link to="/userdashboard"><button className="btn btn-ghost">User DashBoard</button> </Link>
                <Link to="/admindashboard"><button className="btn btn-ghost">Admin Dashboard</button></Link>
                {user ? <button onClick={logout} className="btn btn-ghost">Sign Out</button> : <Link to="/login"><button className="btn btn-ghost">LogIn</button></Link>}
                <button className="btn btn-ghost">{user?.displayName}</button>
            </div>
        </div>
    );
};

export default Navbar;