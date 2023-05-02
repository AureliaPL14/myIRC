import React, {useEffect, useState} from "react";
import axios from "axios";

const NewServer = () => {
    const [name, setName] = useState("")

    function createServer()
    {
        axios.post('/api/servers', {
            'name': name
        }).then(() => {
            //
        })
    }

    return (
        <>
            <div className={"m-5 p-5 text-white"}>
                <label htmlFor={"name"}>Name: </label>
                <input type={"text"} name={"name"} id={"name"} value={name} onChange={(e) => {
                    setName(e.target.value)
                }} className={"input-group-text"} />
                <button className={"btn btn-success"} onClick={(e) => {
                    e.preventDefault()
                    createServer()
                }}>Create !</button>
            </div>
        </>
    )
}

export default NewServer