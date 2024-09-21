import React from 'react'
import { Input } from 'antd';
import { Button, Flex } from 'antd';
import { Col, Row } from 'antd';
import { useState } from 'react';


const Addteam = () => {

  const [team,SetTeam]=useState({
    name:""
  })

  const [msg,SetMsg]=useState()

  const [existingTeams,SetexistingTeam]=useState([])

  useState(()=>{
    fetch('http://localhost:9090/teams')
    .then((response)=>response.json())
    .then((data)=>{
      SetexistingTeam(data.data)
    })
    .catch((err)=>{
      console.log("error",err)
    })

  },[])

  const HandleChange=(event)=>{
    SetTeam({...team,[event.target.name]:event.target.value})
  }

  const HandleClick=()=>{
    console.log(team)

    const teamExist = existingTeams.some(existingTeam=>existingTeam.name.toLowerCase()===team.name.toLowerCase())

    if(teamExist){
        SetMsg("team already exist")
    }

    else{

    let newData ={...team}

    fetch('http://localhost:9090/teams',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(newData)
    })
    .then((response)=>response.json())
    .then((data)=>{
        SetMsg(data.message);
      SetexistingTeam([...existingTeams,newData])
    })
    .catch((err)=>{
      console.log("error",err)
    })
  }

  setTimeout(()=>{
    SetMsg(undefined)
  },1000)

  }

  // const HandleClick=()=>{
  //   console.log(team)

  //   let TeamsData={...team}

  //   fetch('http://localhost:9090/teams',{
  //     method:'POST',
  //     headers:{
  //       'Content-type':'application/json'
  //     },
  //     body:JSON.stringify(TeamsData)
  //   })

  //   .then((response)=>response.json())
  //   .then((data)=>{
  //     SetMsg(data.message)
  //   })
  //   .catch((err)=>{
  //     console.log("error",err)
  //   })
  // }
  
  return (
    <div>
      <Row style={{marginTop:"200px"}}>
      <Col
      xs={{
        span: 11,
        offset: 1,
      }}
      lg={{
        span: 10,
        offset: 7,
      }}
    >
      <h1>{msg}</h1>
      <Input placeholder="Add Team" name='name' onChange={HandleChange} />
      <Button type="primary" onClick={HandleClick} style={{marginTop:"30px"}}>Add Team</Button>
    </Col>
    </Row>
       
    </div>
  )
}

export default Addteam