import React from 'react'
import { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';

const Teamlist = () => {

  const [team,Setteam]=useState([])

  const [players,Setplayers]=useState([])

 
  useEffect(()=>{
    fetch('http://localhost:9090/teams')
    .then((response)=>response.json())
    .then((data)=>{
      Setteam(data.data)
    })
    .catch((err)=>{
      console.log("error",err)
    })
  

  
    fetch('http://localhost:9090/players')
    .then((response)=>response.json())
    .then((data)=>{
      Setplayers(data.data)
    })
    .catch((err)=>{
      console.log("error",err)
    });
  },[])


  const NumbersofPlayers=(teamName)=>{
  return players.filter((player)=>player.team===teamName).length
  }
    

  return (
    <div>
      
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Team Name</th>
          <th>No..of players</th>
        </tr>
      </thead>
      <tbody>
        
          {
            team.map((data,i)=>(
          <tr key={data.id}>
          <td>{i+1}</td>
          <td>{data.name}</td>
          <td>{NumbersofPlayers(data.name)}</td>
        </tr>

      ))

    }

        </tbody>
        </Table>

    </div>
  )
}

export default Teamlist