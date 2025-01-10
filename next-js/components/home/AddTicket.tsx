'use client'
import { TdataTicketCategorize, TstatusTicket } from '@/interface';
import { Button, Flex, Image, Input, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'

export default function AddTicket({status, dataTicketState, setDataTicketState} : { status : TstatusTicket, dataTicketState : TdataTicketCategorize, setDataTicketState : (value: TdataTicketCategorize)=> void}) {
  const [ openInput, setOpenInput ] = useState<boolean>(false);
  const [ titleState, setTitleState] = useState<string>("");

  async function handleCreateTicket(){
    try{
      const result = await axios.post("http://127.0.0.1:8000/tickets",{
        title : titleState,
        description: "",
        contact: "",
        status : status
      })
      console.log(result.data)
      // separate value in dataTicketState
      const newDataTicketState : TdataTicketCategorize = JSON.parse(JSON.stringify(dataTicketState));

      // access array and push new ticket created
      newDataTicketState.forEach((orderStatusData, i: number) => {
        if(orderStatusData.status === status){
          orderStatusData.dataFollowStatus = [
            ...orderStatusData.dataFollowStatus,
            {
              id: result.data.data.id,
              title: titleState,
              description: "",
              contact: "",
              status : status, 
              create_at : result.data.data.create_at,
              update_at : result.data.data.update_at
            }
          ]
        }
      });
      setDataTicketState(newDataTicketState)
      setTitleState("")
      setOpenInput(false)
    }catch(error){
      throw(error)
    }
    
  }

  return (
    <>
      <Flex alignItems={"center"} gap={"8px"} display={openInput ? "flex" : "none"}>
        <Input 
          w={"400px"}
          placeholder="Type Title ticket"
          fontWeight={"400"}
          fontSize={"16px"}
          borderColor ={"gray.200"}
          value={titleState}
          onChange={(e)=>{setTitleState(e?.target.value)}}
          _focus={{
            outline: "none",
            color : "black",
            borderColor : "gray.400"
          }}
        />
        <Button rounded={"6px"} bgColor={"gray.100"} px={"8px"} py={"4px"} h={"auto"} 
          onClick={()=>{ setOpenInput(false) }}
        >
          <Text fontSize={"14px"} color={"gray.600"}>Cancel</Text>
        </Button>
        <Button rounded={"6px"} bgColor={"brand.700"} px={"8px"} py={"4px"} h={"auto"} 
          onClick={()=>{
            handleCreateTicket()
          }}
        >
          <Text fontSize={"14px"}>Save</Text>
        </Button>
      </Flex>
      <Flex alignItems={"center"} ml={"4px"} 
        display={openInput ? "none" : "flex"}
        onClick={()=>{
          setOpenInput(!openInput)
        }}
      >
        <Image src="/add.svg"/>
        <Text fontSize={"14px"} color={"gray.500"} fontWeight={"500"}>Add Ticket</Text>
      </Flex>
    </>
  )
}
