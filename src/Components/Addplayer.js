import React from 'react'
import { Input } from 'antd';
import { Col, Row } from 'antd';
import { useState } from 'react';
import { Button, Flex } from 'antd';


const Addplayer = () => {

const [players,Setplayers]=useState({
    name:"",
    age:"",
    team:""
})


const [message,Setmessage]=useState('')

const HandleChange=(event)=>{
    Setplayers({...players,[event.target.name]:event.target.value})
}


const HandleClick=()=>{
    // if(!players.name || !players.age || !players.team){
    //     Setmessage("all details are important")
    //     return;
    //   }

   console.log(players)

   //Validating the input fields should be proper
   const {name,age,team}=players

   //Validating the name
   const Nameregex =  /^[A-Za-z\s]+$/;
   if(!name || !Nameregex.test(name)){
      Setmessage("plese input a valid name")
      return;
   }

   //Validating Age
   const ageNumber =Number(age)
   if(!age || isNaN(ageNumber) || ageNumber<1 || ageNumber>100 ){
       Setmessage("plese input a valid age")
       return;
   }

   if(ageNumber<20 || ageNumber>55){
    Setmessage("you are not in Age range")
    return;
   }

   //Validating team
   if(!team){
    Setmessage("plese input team")
    return;
   }


   // fetching the data from server to limit the player not more than 12 players allowed
   fetch('http://localhost:9090/players')
   .then((response)=>response.json())
   .then((data)=>{
      const playersInTeam = data.data.filter(player=>player.team==team).length;
      if(playersInTeam>=12){
      Setmessage("can not add more than 12 player in same team")
      return;
      }
  


   //Sending the data to Beckend Server
    const newPlayer = {...players}

    fetch('http://localhost:9090/players',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newPlayer)
    })

      .then((response) => response.json())
      .then((data)=>{
        
        Setmessage(data.message)

        //Setplayers({name:'',age:'',team:''});
      }).catch((err)=>{
        Setmessage('error',err)

      });

      setTimeout(()=>{
        Setmessage(undefined)
      },1500)
    })
}

  return (
    <div style={{marginTop:"150px"}}>
        <Row>
        <Col
      xs={{
        span: 11,
        offset: 5,
      }}
      lg={{
        span: 6,
        offset: 8,
      }}
    >
        <h2>{message}</h2>
         <Input placeholder="Name"  onChange={HandleChange} name='name' value={players.name} />
         <Input placeholder="Age" onChange={HandleChange} name='age' value={players.age} />
         <Input placeholder="team" onChange={HandleChange} name='team' value={players.team} />
     
         <Flex 
    vertical
    gap="small"
    style={{
      width: '100%',
    }}
  >
    <Button type="primary" block style={{marginTop:"40px"}} onClick={HandleClick}>
      Add Player
    </Button>

    </Flex>

    </Col>
    </Row>
         
    </div>
  )
}

export default Addplayer