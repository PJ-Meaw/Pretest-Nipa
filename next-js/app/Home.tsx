'use client'
import TabMenu from '@/components/home/TabMenu'
import { Tticket, TstatusTicket, TdataTicketCategorize } from '@/interface'
import { Flex, Box, Text, Button, Image, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { formatDate } from '@/utils/date'
import StatusButton, { StatusButtonLarge } from '@/components/StatusButton'
import AddTicket from '@/components/home/AddTicket'
import Modal from '@/components/home/Modal'
import FilterStatus from '@/components/FilterStatus'
import SortStatusButton from '@/components/home/SortStatusButton'

export default function Home({dataTicketCategorize} : { dataTicketCategorize: TdataTicketCategorize}) {
  const [dataTicketState, setDataTicketState] = useState<TdataTicketCategorize>(dataTicketCategorize);

  return (
    <Flex maxW={"100vw"} h={"100vh"} >
      {/* Tab Menu */}
      <TabMenu/>
      
      {/* Ticket Content */}
      <Flex flexDir={"column"} pt={"40px"} flex={1}>
        {/* Topic */}
        <Text fontSize={"48px"} fontWeight={"600"} pl={"48px"} mb={"40px"}>Overall Ticket</Text>
        <Flex flexDir={"column"}>
          {/* list board */}
          <Flex pl={"48px"} w={"full"}>
            <Button h={"auto"} p={"8px"} bgColor={"transparent"} borderWidth={"0px"}  borderBottomWidth={"1px"} rounded={"0px"} borderColor={"black"}>
              <Image src={"/list.svg"}/>
              <Text fontSize={"20px"} fontWeight={"600"} color={"black"}>Ticket list</Text>
            </Button>
          </Flex>
          {/* Divider */}
          <Box w={"full"} h={"1px"} bgColor={"#D9D9D9"}/>
        </Flex>
        {/* Filter & Sorting Part */}
        <Flex pl={"48px"}>
          <Flex gap={"8px"} alignItems={"center"}>
            <Text fontSize={"18px"} fontWeight={"500"}>Filter : </Text>
            <FilterStatus dataTicketStateTraditional={dataTicketCategorize} setDataTicketState={setDataTicketState}/>
          </Flex>
          <Flex gap={"8px"} alignItems={"center"}>
          <Text fontSize={"18px"} fontWeight={"500"}>Sort : </Text>
            <SortStatusButton setDataTicketState={setDataTicketState} dataTicketState={dataTicketState}/>
          </Flex>
        </Flex>

        {/* Ticket Show Part*/}
        <Box w={"full"} h={"full"} overflow={"auto"} pt={"20px"}> 
          {
            dataTicketState.map((orderStatusData)=>{
              return(
                <Flex flexDir={"column"} gap={"48px"} py={"32px"} pl={"48px"} key={orderStatusData.order}>
                  {/* Status 1. */}
                  <Flex flexDir={"column"} gap={"16px"}>
                    <StatusButtonLarge status={orderStatusData.status}/>
                    {/* sub topic */}
                    <Flex w={"full"} flexDir={"column"}>
                      {/* sub topic */}
                      <Flex>
                        <Text color={"gray.700"} w={"366px"}>Title</Text>
                        <Text color={"gray.700"} flex={1}>Description</Text>
                        <Text color={"gray.700"} w={"182px"}>Status</Text>
                        <Text color={"gray.700"} w={"250px"}>Contact Information</Text>
                        <Text color={"gray.700"} w={"180px"}>Created</Text>
                        <Text color={"gray.700"} w={"180px"}>Updated</Text>
                      </Flex>
                      {/* Divider */}
                      <Box w={"full"} h={"1px"} bgColor={"#D9D9D9"}/>

                      {/* ticket list */}
                      {
                        orderStatusData.dataFollowStatus?.map((ticket : Tticket, i : number)=>{
                          return(
                            <Modal key={ticket.id} ticketData={ticket} dataTicketState={dataTicketState} setDataTicketState={setDataTicketState}>
                              <Box>
                                {/* Row ticket */}
                                <Flex py={"10px"} alignItems={"center"} _hover={{ bgColor: "gray.100"}} transition={"all 0.2s ease-in-out"}
                                  cursor={"pointer"}
                                >
                                  <Text pr={"20px"} fontWeight={"500"} w={"342px"} ml={"24px"} truncate >{ticket.title}</Text>
                                  <Text pr={"40px"} flex={1} w={"0px"} truncate>{ticket.description} </Text>
                                  <Box w={"182px"} pr={"20px"}>
                                    <StatusButton status={ticket.status}/>
                                  </Box>
                                  <Text pr={"20px"} w={"250px"} truncate>{ticket.contact}</Text>
                                  <Text pr={"20px"} w={"180px"} truncate>{formatDate(ticket.create_at)}</Text>
                                  <Text pr={"20px"} w={"180px"} truncate>{formatDate(ticket.update_at)}</Text>
                                </Flex>
                                {/* Divider */}
                                <Box w={"full"} h={"1px"} bgColor={"#D9D9D9"}/>
                              </Box>
                            </Modal>
                          )
                        })
                      }
                      {/* Add Ticket (last only) */}
                      <Box w={"full"} py={"12px"} cursor={"pointer"} _hover={{ bgColor: "gray.100"}} transition={"all 0.2s ease-in-out"}>
                        <AddTicket status={orderStatusData.status} dataTicketState={dataTicketState} setDataTicketState={setDataTicketState}/>
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              )
            })
          }
        </Box>
      </Flex>
    </Flex>
  )
}
