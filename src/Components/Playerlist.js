import React from 'react'
import { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Playerlist = () => {

    const [players,Setplayers]=useState([])

    const [message,Setmessage]=useState('')

    const Navigate = useNavigate()

     useEffect(()=>{
        fetch('http://localhost:9090/players')
        .then((response)=> response.json())
        .then((data)=>{
            Setplayers(data.data)
        })
        .catch((err)=>{
            console.log("error",err)
        });
     },[])    

     
     const HandleDelete=(id)=>{
        fetch(`http://localhost:9090/players/${id}`,{
            method:'DELETE'
        })
        .then((response)=>response.json())
        .then((data)=>{
            Setmessage(data.message)
            Setplayers(players.filter(players=>players.id !==id))
        })
        .catch((err)=>{
            console.log("error",err)
        })
     }

     const Edit=(data)=>{
        Navigate('/editplayer',{state:data})
     }


  return (
    <div>

        <alert>{message}</alert>

<Table striped bordered hover>
      <thead>
        <tr>
          <th>S.no</th>
          <th>Name</th>
          <th>Age</th>
          <th>Team</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
      {
        
          players.map((data,i)=>(
        <tr key={data.id}>
          <td>{i+1}</td>
          <td>{data.name}</td>
          <td>{data.age}</td>
          <td>{data.team}</td>
          <td><Button onClick={()=>HandleDelete(data.id)}>Delete</Button></td>
          <td><Button onClick={()=>Edit(data)}>Edit</Button></td>
        </tr>
        ))
    }
        </tbody>
        </Table>
     
     {/* {players.map((player)=>(
        <div key={player.id} style={{border: '1px solid #ccc', padding: '16px', margin: '16px 0'}}>
            <h3>{player.name}</h3>
            <p>{player.age}</p>
            <p>{player.team}</p>
        </div>
     ))} */}

    </div>
  )
}

export default Playerlist