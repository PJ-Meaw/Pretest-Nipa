import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TdataTicketCategorize, Tticket } from "@/interface";
import { Button, Flex, Input, Text, Image, Box, Textarea } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react";
import { StatusButtonLarge } from "../StatusButton";
import { formatDate } from "@/utils/date";
import SelectStatus from "../SelectStatus";


export default function Modal({ 
  children, ticketData, dataTicketState, setDataTicketState } 
  : {children: React.ReactNode, ticketData : Tticket, dataTicketState : TdataTicketCategorize, setDataTicketState: (value : TdataTicketCategorize)=>void }) 
{
  const [ openTitle, setOpenTitle] = useState<boolean>(false);
  const [ titleState, setTitleState] = useState<string>(ticketData.title);
  const [ contactState, setContactState] = useState<string>(ticketData.contact);
  const [ descriptionState, setDescriptionState] = useState<string>(ticketData.description);
  const [ contactStateOld, setContactStateOld] = useState<string>(ticketData.contact);
  const [ descriptionStateOld, setDescriptionStateOld] = useState<string>(ticketData.description);

  async function handleUpdateTicket( updateSpecify : "title" | "contact" | "description"){
    try{
      let prepareData = {}
      if(updateSpecify === "title")
        prepareData = { "title" : titleState }
      else if(updateSpecify === "contact")
        prepareData = { "contact" : contactState }
      else if(updateSpecify === "description")
        prepareData = { "description" : descriptionState }

      console.log("id :" + ticketData.id )
      console.log(prepareData)

      const result = await axios.put(`http://127.0.0.1:8000/tickets/${ticketData.id}`, prepareData)
      console.log(result.data)
      // separate value in dataTicketState
      const newDataTicketState : TdataTicketCategorize = JSON.parse(JSON.stringify(dataTicketState));

      // access array and push new ticket created
      newDataTicketState.forEach((orderStatusData, i: number) => {
        if(orderStatusData.status === ticketData.status){
          orderStatusData.dataFollowStatus.forEach((ticket)=>{
            if(ticket.id === ticketData.id){
              ticket.title = result.data.data.title
              ticket.description = result.data.data.description
              ticket.status = result.data.data.status
              ticket.create_at = result.data.data.create_at
              ticket.update_at = result.data.data.update_at
            }
          })
        }
      });
      setDataTicketState(newDataTicketState)
      if(updateSpecify === "title"){
        setTitleState(result.data.data.title)
        setOpenTitle(false)
      }else if(updateSpecify === "contact")
        setContactStateOld(result.data.data.contact)
      else if(updateSpecify === "description")
        setDescriptionStateOld(result.data.data.description)
    }catch(error){
      throw(error)
    }
    
  }

  return (
    <DialogRoot placement="bottom" trapFocus={false}>
      <DialogBackdrop />
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent
        minW={"1336px"} minH={"768px"} bgColor={"white"}
        display={"flex"} flexDir={"column"} gap={"24px"}
      >
        {/* First Row */}
        <Flex flexDir={"column"} gap={"24px"}>
          <Flex flexDir={"row"} justifyContent={"space-between"} px={"48px"} pt={"42px"} alignItems={"center"} >
            {/* Title */}
            <Flex alignItems={"center"} gap={"8px"} h={"full"}>
              <Text fontSize={"36px"} fontWeight={"500"} lineHeight={"normal"}>Title : </Text>
              <Button px={0} _hover={{borderWidth:"1px", borderColor:"gray.500"}} bgColor={"transparent"}  w={"700px"} 
                display={openTitle ? "none" : "flex"} justifyContent={"start"}
                onClick={()=>{setOpenTitle(true)}}
              >
                <Text color={"black"} fontSize={"38px"} fontWeight={"600"} lineHeight={"normal"} truncate >{ticketData.title}</Text>
              </Button>
              {/* Input for title  */}
              <Flex display={openTitle ? "flex" : "none"} gap={"8px"} alignItems={"center"}>  
                <Input 
                  w={"700px"}
                  placeholder="Type Title ticket"
                  fontWeight={"400"}
                  fontSize={"16px"}
                  borderColor ={"gray.200"}
                  value={titleState}
                  onChange={(e)=>{setTitleState(e?.target.value)}}
                />
                <Button rounded={"6px"} bgColor={"gray.100"} px={"8px"} py={"6px"} h={"fit-content"}  
                  onClick={()=>{ setOpenTitle(false) }}
                >
                  <Text fontSize={"14px"} color={"gray.600"}>Cancel</Text>
                </Button>
                <Button rounded={"6px"} bgColor={"brand.700"} px={"16px"} py={"6px"}  h={"fit-content"} 
                  onClick={()=>{
                    handleUpdateTicket("title")
                  }}
                >
                  <Text fontSize={"14px"}>Save</Text>
                </Button>
              </Flex>
            </Flex>
            {/* Close */}
            <DialogCloseTrigger asChild right={"48px"} top={"42px"} _hover={{bgColor: "transparent"}}>
              <Image src={"/close.svg"}/>
            </DialogCloseTrigger>
          </Flex>
          {/* Divider */}
          <Box w={"full"} h={"1px"} bgColor={"#D9D9D9"}/>
        </Flex>

        {/* other without Title */}
        <Flex px={"48px"} flexDir={"column"} gap={"24px"}>
          {/* Row (Status & Contact & Updated & Created) */}
          <Flex gap={"64px"}>

            {/* Col (Status & Contact) */}
            <Flex flexDir={"column"} gap={"18px"} w={"628px"}>
              {/* Status Part */}
              <Flex gap={"140px"} alignItems={"center"}>
                <Text fontSize={"24px"} fontWeight={"500"}>Status</Text>
                {/* <StatusButtonLarge status={ticketData.status}/> */}
                <SelectStatus id={ticketData.id} status={ticketData.status} dataTicketState={dataTicketState} setDataTicketState={setDataTicketState}/>
              </Flex>
              {/* Contact Part */}
              <Flex flexDir={"column"} gap={"12px"}  >
                <Text fontSize={"24px"} fontWeight={"500"}>Contact Information</Text>
                <Textarea
                  value={contactState}
                  fontSize={"16px"}
                  minH={"150px"}
                  outline={"none"}
                  onChange={(e)=>{setContactState(e.target.value)}}
                />
                {/* Save & Cancel Button */}
                <Flex gap={"8px"} alignSelf={"end"} display={ contactState === contactStateOld ? "none" : "flex"}>
                  <Button rounded={"6px"} bgColor={"gray.100"} px={"8px"} py={"6px"} h={"fit-content"}   
                    onClick={()=>{ setContactState(ticketData.contact) }}
                  >
                    <Text fontSize={"14px"} color={"gray.600"}>Cancel</Text>
                  </Button>
                  <Button  rounded={"6px"} bgColor={"brand.700"} px={"16px"} py={"6px"} h={"auto"} 
                    onClick={()=>{
                      handleUpdateTicket("contact")
                    }}
                  >
                    <Text fontSize={"14px"}>Save</Text>
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            {/* Col (Updated & Created) */}
            <Flex flexDir={"column"} gap={"24px"} w={"628px"}>
              {/* Update Part */}
              <Flex gap={"40px"} alignItems={"center"}>
                <Text fontSize={"24px"} fontWeight={"500"} w={"120px"}>Update At</Text>
                <Text fontSize={"22px"} fontWeight={"400"}>{formatDate(ticketData.update_at)}</Text>
              </Flex>
              {/* Create Part */}
              <Flex gap={"40px"} alignItems={"center"}>
                <Text fontSize={"24px"} fontWeight={"500"} w={"120px"}>Create At</Text>
                <Text fontSize={"22px"} fontWeight={"400"}>{formatDate(ticketData.create_at)}</Text>
              </Flex>
            </Flex>
          </Flex>

          {/* Row Description */}
          <Flex flexDir={"column"} gap={"16px"}>
            <Text fontSize={"24px"} fontWeight={"500"}>Description</Text>
            <Textarea
              fontSize={"16px"}
              value={descriptionState}
              minH={"220px"}
              outline={"none"}
              onChange={(e)=>{setDescriptionState(e.target.value)}}
            />
            {/* Save & Cancel Button */}
            <Flex gap={"8px"} alignSelf={"end"} display={ descriptionState === descriptionStateOld ? "none" : "flex"}>
              <Button rounded={"6px"} bgColor={"gray.100"} px={"8px"} py={"6px"} h={"fit-content"}  
                onClick={()=>{ setDescriptionState(ticketData.description) }}
              >
                <Text fontSize={"14px"} color={"gray.600"}>Cancel</Text>
              </Button>
              <Button alignSelf={"end"} rounded={"6px"} bgColor={"brand.700"} px={"16px"} py={"6px"} h={"auto"} 
                onClick={()=>{
                  handleUpdateTicket("description")
                }}
              >
                <Text fontSize={"14px"}>Save</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </DialogContent>
    </DialogRoot>
  )
}
