import React, { useEffect } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Input,Button } from 'antd';
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
//import axios from 'axios';

//let Api = `http://localhost:9090/players`;

const Editplayerlist = () => {

    const [players,Setplayers]=useState({
      id:'0',
      name:'',
      age:'',
      team:''
    })

    const {state}=useLocation()

    //const navigate = useNavigate()

    const [message,Setmessage]=useState('')

    useEffect(() => {
        if (state) {
          Setplayers(state);
        }
      }, [state]);

    const HandleChange =(event)=>{
        Setplayers({...players,[event.target.name]:event.target.value})
    }


    const HandleClick=(id)=>{
         console.log(players)
        const newPlayer={...players}
        fetch(`http://localhost:9090/players`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(newPlayer)
        })
        .then((response)=>response.json())
        
        .then((data)=>{
             Setmessage(data.message)
        })
        .catch((err)=>{
            console.log("error",err)
        })

    //    axios.put(`http://localhost:9090/players/${players.id}`,players).then((result)=>{
    //     Setmessage(
    //         result.data.message,
    //     )

    //    }).catch((err)=>{
    //      console.log("error",err)
    //    })

    }

    // useEffect(()=>{
    //     Setplayers(state)
    //   },[state])
    

  return (
    <div>
        <h2>{message}</h2>
        <Input size="large" name='name' value={players.name} prefix={<UserOutlined />} onChange={HandleChange} />
    <br />
    <br />
    <Input size="large" name='age' value={players.age} prefix={<UserOutlined />} onChange={HandleChange} />
    <br />
    <br />
    <Input size="large" name='team' value={players.team} prefix={<UserOutlined />} onChange={HandleChange} />
    <br />
    <br />
    <Button type="primary" onClick={()=>HandleClick()}>Submit</Button>
    </div>
  )
}

export default Editplayerlist