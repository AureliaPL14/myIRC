import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {Route, Routes, redirect, Link} from 'react-router-dom';
import Channels from "./Channels";
import NewServer from "./NewServer";

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
                <div className={"row vh-100"}>
                    <aside className={"col-4 row"} style={{borderRight: "5px solid #23272A"}}>
                        <div className={"col-3 h-100 pt-3 overflow-x-hidden overflow-y-auto"} style={{background: "#23272A"}}>
                            <ul>
                                {servers.length > 0 && servers.map(server =>
                                    <li>
                                        <Link to={"/server/" + server}> {server.name} </Link>
                                    </li>
                                )}
                                <li>
                                    <Link to={"/server/new"} className={"btn rounded-circle text-white"} style={{background: "#2C2F33"}}><i className={"fa fa-plus"}></i></Link>
                                </li>
                            </ul>
                        </div>
                        <div className={"col-9 container overflow-auto"}>
                            <Routes>
                                <Route path={"/server/:server"} element={<Channels />} />
                            </Routes>
                        </div>
                    </aside>
                    <div className={"col-8"}>
                        <Routes>
                            <Route path={"/server/new"} element={<NewServer />} />
                            {/*<redirect exact="/" to="/users" />
                    <Route path="/users" component={Users} />
                    <Route path="/posts" component={Posts} />*/}
                        </Routes>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home;