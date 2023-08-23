import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import dummyData from "./dummy.json";
import { Dropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Layout = () => {
const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
const [username, setUsername] = useState(localStorage.getItem('username') || '');
const [password, setPassword] = useState(localStorage.getItem('password') || '');
const [isAdmin, setIsAdmin] = useState(null);
const [error, setError] = useState(null);
const [showDropdown, setShowDropdown] = useState(false);

function handleLogin(event) {
    event.preventDefault();

    // Check username and password against dummy data
    const user = dummyData.users.find(u => u.username === username && u.password === password);

    if (user) {
      setLoggedIn(true);
      setIsAdmin(user.isAdmin)
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    } else {
      setError('Invalid username or password');
    }
}

function handleLogout() {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('username', '');
    localStorage.setItem('password', '');
}



if (!loggedIn) {
    return (
    <>
        <div>
            <div className="loginBorder2 fixed-top" />
            <div className="loginBorder1 position-fixed top-0 start-0" />
            <div className="loginBorder3 position-fixed top-0 end-0" />
            <div className="loginBorder4 fixed-bottom" />
            <div className="loginBorder5 position-fixed bottom-0 start-0" />
            <div className="loginBorder6 position-fixed bottom-0 end-0" />
        </div>

        <div style={{ fontFamily: 'MyCustomFont'}} className="container-fluid vh-100 d-flex justify-content-center align-items-center">
            <div className="loginBackground d-flex justify-content-center align-items-center">
                <div className="login p-5 rounded text-sm text-md text-xl">
                    <form onSubmit={handleLogin}>
                    {error && <div>{error}</div>}
                    <div className="m-2">
                        <label htmlFor="username">USERNAME  :   </label>
                        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="m-2">
                        <label htmlFor="password">PASSWORD  :   </label>
                        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <button type="submit" className="container-fluid d-flex justify-content-center align-items-center">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
    
}

    return (
        <>
            <div className="container-fluid" style={{ fontFamily: 'MyCustomFont' }}>
                <div className="row">
                    <div className="col-sm-5" />
                        <div className="d-flex col-sm-3">
                            <Dropdown show={showDropdown} onClick={() => setShowDropdown(!showDropdown)} onBlur={(event) => event.relatedTarget === null && setShowDropdown(false)} 
                            className="col-sm-4 d-block d-sm-none justify-content-right homeButton">
                                <Dropdown.Toggle id="dropdown-basic" className="d-block d-sm-none drop-button " style={{fontSize: "20px", paddingLeft: "30px", paddingRight: "30px"}}>
                                    Menu
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropMenu justify-content-center text-center">
                                    <Dropdown.Item className="dropItem">
                                        <Button style={{fontSize: "15px", paddingLeft: "30px", paddingRight: "30px"}} variant="contained">
                                            <Link class="link" to="/" style={{ fontFamily: 'MyCustomFont' }}>Home</Link> 
                                        </Button>
                                    </Dropdown.Item>
                                        <Button style={{ fontSize: "15px", paddingLeft: "30px", paddingRight: "30px"}} variant="contained">
                                            <Link class="link" to="/get" style={{ fontFamily: 'MyCustomFont' }}>Safari Zone</Link>
                                        </Button>
                                    <Dropdown.Item>
                                        <Button style={{ fontSize: "15px", paddingLeft: "30px", paddingRight: "30px"}} variant="contained">
                                            <Link class="link" to="/pokedex" style={{ fontFamily: 'MyCustomFont' }}>Pokedex</Link>
                                        </Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button style={{fontSize: "15px", paddingLeft: "40px", paddingRight: "40px", fontFamily: 'MyCustomFont'}} variant="contained" onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    <div className="col-sm-5" />
                </div>

                <div className="row d-none d-sm-block" >
                    <nav className="navbar navbar-expand-lg navbar-light bg-red">   
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <Link className="link" to="/">
                                <Button style={{marginRight: 10, fontSize: "25px", paddingLeft: "30px", paddingRight: "30px", fontFamily: "MyCustomFont"}} variant="contained" href="/">
                                    Home 
                                </Button>
                            </Link>
                            <Link className="link" to="/get">
                                <Button style={{marginRight: 10, fontSize: "25px", paddingLeft: "30px", paddingRight: "30px", fontFamily: "MyCustomFont"}} variant="contained" href="/">
                                    Safari Zone 
                                </Button>
                            </Link>
                            <Link className="link" to="/pokedex">
                                <Button style={{marginRight: 10, fontSize: "25px", paddingLeft: "30px", paddingRight: "30px", fontFamily: "MyCustomFont"}} variant="contained" href="/">
                                    Pokedex 
                                </Button>
                            </Link>                       
                            <Button style={{marginRight: 10, fontSize: "25px", paddingLeft: "30px", paddingRight: "30px"}} variant="contained" onClick={handleLogout}>
                                <div style={{ fontFamily: 'MyCustomFont' }}>Logout</div>
                            </Button>
                            {isAdmin? (
                            <Link className="link" to="/testing">
                                <Button style={{marginRight: 10, fontSize: "25px", paddingLeft: "30px", paddingRight: "30px", fontFamily: "MyCustomFont"}} variant="contained" href="/">
                                    Testing Page 
                                </Button>
                            </Link>
                            ) : null}
                        </div>
                        <div className="col-md-3" />
                    </nav>
                </div>
        
            </div>
        

            <Outlet />
            <footer class="text-center text-white position-relative fixed-bottom">
                <div class="text-center mt-4 p-3" style={{backgroundColor: 'black'}}>
                    © 2020 Copyright:
                    <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
            </footer>

        </>
    )
};

export default Layout;