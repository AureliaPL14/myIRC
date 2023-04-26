import React, {Component} from 'react';
import {Route, Routes, redirect, Link} from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
                    <Link className={"navbar-brand"} to={"/"}> My IRC </Link>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className={"nav-link"} to={"/posts"}> Posts </Link>
                            </li>

                            <li className="nav-item">
                                <Link className={"nav-link"} to={"/users"}> Users </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Routes>
                    {/*<redirect exact="/" to="/users" />
                    <Route path="/users" component={Users} />
                    <Route path="/posts" component={Posts} />*/}
                </Routes>
            </div>
        )
    }
}

export default Home;