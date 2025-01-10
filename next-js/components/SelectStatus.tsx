"use client"
import { Flex, Text, Box, Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { TdataTicketCategorize, TstatusTicket } from "@/interface"
import StatusButton from "./StatusButton"
import axios from "axios"
import { categorizeTicket } from "@/utils/categorizeTicket"

export default function SelectStatus({
  id, status, dataTicketState, setDataTicketState } : {
  id: number, status: TstatusTicket, dataTicketState : TdataTicketCategorize, setDataTicketState: (value : TdataTicketCategorize)=>void}) 
{

  async function handleUpdateStatus(statusSelect : TstatusTicket){
    try{
      const result = await axios.put(`http://127.0.0.1:8000/tickets/${id}`,{
        status : statusSelect
      })
      const { data : dataTicket } = await axios.get("http://127.0.0.1:8000/tickets")
      const dataTicketCategorize = categorizeTicket(dataTicket)
      setDataTicketState(dataTicketCategorize)
    
    }catch(error){
      console.log(error)
    }

  } 

  return (
    <MenuRoot>
      <MenuTrigger asChild >
        <Flex h={"auto"} pl={"0px"} pr={"200px"} py={"4px"} cursor={"pointer"}  rounded={"8px"} _hover={{
          bgColor : "gray.100",
        }}
          transition={"all 0.2s ease-out"} boxSizing={"border-box"}
        >
          <StatusButton status={status}/>
        </Flex>
      </MenuTrigger>
      <MenuContent zIndex={2000} >
        {
          [ "pending","accepted", "rejected", "resolved"].map((statusMap)=>{
            if(statusMap !== status)
            return(
              <MenuItem key={statusMap} value={statusMap} onClick={()=>{handleUpdateStatus(statusMap as TstatusTicket)}}>
                <StatusButton status={statusMap as TstatusTicket}/>
              </MenuItem>
            )
          })
        }
      </MenuContent>
    </MenuRoot>
  )
}


