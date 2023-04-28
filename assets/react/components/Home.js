import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {Route, Routes, redirect, Link} from 'react-router-dom';

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [servers, setServers] = useState([])

    useEffect(function () {
        axios.get('/api/servers')
            .then((response) => {
                setServers(response.data)
                setLoading(false)
            })
    }, [])

    return (
        <div className="container w-100 p-0 m-0">
            {
                loading
            ?
                <div className={"row align-items-center justify-content-evenly vh-100"}>
                    <div className={"col-6"}>
                        <progress className={"progress w-100"}></progress>
                    </div>
                </div>
            :
                <>
                    <aside className={"col-4 row vh-100"} style={{border: "5px solid #23272A"}}>
                        <div className={"border-end col-3 h-100 pt-3"} style={{background: "#23272A"}}>
                            <ul>
                                {servers.length > 0 && servers.map(server =>
                                    <li>
                                        <Link to={"/"}> {server.name} </Link>
                                    </li>
                                )}
                                <li>
                                    <Link to={"/server/new"} className={"btn rounded-circle text-white"} style={{background: "#2C2F33"}}><i className={"fa fa-plus"}></i></Link>
                                </li>
                            </ul>
                        </div>
                        <div className={"col-9"}></div>
                    </aside>
                    <Routes>
                        {/*<redirect exact="/" to="/users" />
                <Route path="/users" component={Users} />
                <Route path="/posts" component={Posts} />*/}
                    </Routes>
                </>
            }
        </div>
    )
}

export default Home;