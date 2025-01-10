"use client"
import { Flex, Text, Box, Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { TdataTicketCategorize, TstatusTicket, Tticket } from "@/interface"
import StatusButton from "./StatusButton"
import axios from "axios"
import { categorizeTicket } from "@/utils/categorizeTicket"
import { useState } from "react"

export default function FilterStatus({
  dataTicketStateTraditional, setDataTicketState } : {
  dataTicketStateTraditional : TdataTicketCategorize, setDataTicketState: (value : TdataTicketCategorize)=>void}) 
{
  const [ filterStatusCurrent, setFilterCurrent ] = useState<TstatusTicket | "all">("all");
  async function handleFilter(statusSelect : TstatusTicket | "all"){
    setFilterCurrent(statusSelect)
    // separate value in dataTicketState
    let newDataTicketState : TdataTicketCategorize = JSON.parse(JSON.stringify(dataTicketStateTraditional));
    let index = -1 ;
    if(statusSelect !== "all"){
      index = dataTicketStateTraditional.findIndex((orderStateData)=>{
        console.log("orderStateData.status : " + orderStateData.status)
        console.log("statusSelect : " + statusSelect)
        console.log(orderStateData.status)
        return orderStateData.status === statusSelect
      })
    }
    console.log(index)
    console.log(newDataTicketState)

    if(index !== -1)
      setDataTicketState([dataTicketStateTraditional[index]])
    else
      setDataTicketState(dataTicketStateTraditional)
  } 

  return (
    <MenuRoot>
      <MenuTrigger asChild >
        <Flex h={"auto"} pl={"0px"} pr={"200px"} py={"4px"} cursor={"pointer"}  rounded={"8px"} _hover={{
          bgColor : "gray.100",
        }}
          transition={"all 0.2s ease-out"} boxSizing={"border-box"}
        >
          {
            filterStatusCurrent === "all" ?
            <Button bgColor={"brand.700"} w={"fit-content"} gap={"4px"} px={"30px"} py={"4px"} rounded={"6px"} h={"full"}>
              <Text fontSize={"18px"} fontWeight={400} color={"white"}>All</Text>
            </Button>
            :
            <StatusButton status={filterStatusCurrent as TstatusTicket}/>
          }
        </Flex>
      </MenuTrigger>
      <MenuContent zIndex={2000} >
        {
          ["all", "pending", "accepted", "rejected", "resolved"].map((statusMap)=>{
            if(statusMap !== filterStatusCurrent)
              return(
                <MenuItem key={statusMap} value={statusMap} onClick={()=>{handleFilter(statusMap as TstatusTicket)}}>
                  {
                    statusMap  === "all" ?
                    <Button bgColor={"brand.700"} w={"fit-content"} gap={"4px"} px={"30px"} py={"4px"} rounded={"6px"} h={"full"}>
                      <Text fontSize={"18px"} fontWeight={400} color={"white"}>All</Text>
                    </Button>
                    :
                    <StatusButton status={statusMap as TstatusTicket}/>
                  }
                </MenuItem>
              )
          })
        }
      </MenuContent>
    </MenuRoot>
  )
}


