import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginFailure } from "../store/auth/actions";

const Header = ({ auth, dispatch }) => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = auth;

    const handleHome = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.setItem('isAuthenticated', 'false');

        dispatch(loginFailure("User logged out"));
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo" onClick={handleHome} style={{ cursor: 'pointer' }}>
                    <img src="/images/logo.jpg" alt="Logo" />
                </div>
                <nav className="nav">
                    <ul>
                        {!isAuthenticated ? (
                            <li onClick={handleLogin} style={{ cursor: 'pointer' }}>
                                <i className="fas fa-user"></i><br />
                                Login
                            </li>
                        ) : (
                            <>
                                <li style={{ cursor: 'default' }}>
                                    <i className="fas fa-user-circle"></i><br />
                                    {user?.name && <span>{user.name}<br /></span>}
                                    {user?.username && <span>{user.username}</span>}
                                </li>
                                <li
                                    onClick={handleLogout}
                                    style={{ cursor: 'pointer', marginLeft: '20px', color: 'red' }}
                                >
                                    <i className="fas fa-sign-out-alt"></i><br />
                                    Logout
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Header);
