import React from 'react'
import { Flex, Box, Text, Button, Image } from '@chakra-ui/react'

export default function TabMenu() {
  return (
    <Flex flexDir={"column"} h={"full"} w={"300px"} bgColor={"gray.100"} py={"36px"} px={"24px"} >
      <Flex flexDir={"column"} gap={"72px"}> 
        <Flex gap={"16px"} alignItems={"center"} w={"full"}>
          <Box bgColor={"#E31B54"} w={"40px"} h={"40px"} rounded={"8px"}/>
          <Text flex={1} w={"auto"} fontSize={"28px"} fontWeight={"500"} truncate overflow={"hidden"}>Pathinya Jonsupangpan</Text>
        </Flex>
        <Flex>
          <Button height={"auto"} bgColor={"indigo.600"} p={"16px"} w={"full"} justifyContent={"start"} rounded={"8px"} 
            _hover={{ bgColor : "indigo.500" }} gap={"24px"}
          >
            <Image src={"/layout.svg"} w={"30px"} h={"30px"}/>
            <Text fontSize={"24px"} fontWeight={"500"} color={"white"}>Overview</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
