'use client'
import { TdataTicketCategorize } from '@/interface';
import { Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react'

export default function SortStatusButton({dataTicketState, setDataTicketState } : {dataTicketState : TdataTicketCategorize ,setDataTicketState : ( value : TdataTicketCategorize)=>void}) {
  const [isAscending, setIsAscending] = useState<boolean>(false);

  return (
    <>
      <Button bgColor={isAscending ? "orange.600" : "blueLight.800"} px={"10px"} py={"4px"} h={"auto"}
        onClick={()=>{
          setIsAscending(!isAscending)
          setDataTicketState(dataTicketState.toReversed())
        }}
      >
        <Text font={"16px"} color={"white"}>{isAscending ? "Ascending" : "Descending"}</Text>
      </Button> 
    </>
  )
}
