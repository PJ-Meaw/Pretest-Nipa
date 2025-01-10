import { TstatusTicket } from '@/interface'
import { Button, Text, Image } from '@chakra-ui/react'
import React from 'react'

function checkStatus(status : TstatusTicket){
  if(status === "pending"){
    return { text : "Pending", src : "/status/pending.svg", bgColor : "gray.300"}
  }
  if(status === "accepted"){
    return { text : "Accepted", src : "/status/accepted.svg", bgColor : "blueLight.500"}
  }
  if(status === "rejected"){
    return { text : "Rejected", src : "/status/rejected.svg", bgColor : "rose.800"}
  }
  if(status === "resolved"){
    return { text : "Resolved", src : "/status/resolved.svg", bgColor : "green.600"}
  }
}

export default function StatusButton({status} : {status : TstatusTicket}) {
  return (
    <Button bgColor={checkStatus(status)?.bgColor} w={"fit-content"} gap={"4px"} px={"8px"} py={"4px"} rounded={"6px"} h={"full"}
      position={"relative"}
    >
      <Image src={checkStatus(status)?.src}/>
      <Text fontSize={"16px"} fontWeight={400} color={ status === "pending" ? "black" : "white"}>{checkStatus(status)?.text}</Text>
    </Button>
  )
}

export function StatusButtonLarge({status} : {status : TstatusTicket}) {
  
  return (
    <Button bgColor={checkStatus(status)?.bgColor} w={"fit-content"} gap={"4px"} px={"8px"} py={"8px"} rounded={"6px"} h={"full"}>
      <Image src={checkStatus(status)?.src}/>
      <Text fontSize={"18px"} fontWeight={400} color={ status === "pending" ? "black" : "white"}>{checkStatus(status)?.text}</Text>
    </Button>
  )
}
