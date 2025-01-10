import { TdataTicketCategorize, Tticket } from "@/interface"

export function categorizeTicket(dataTicket:any) : TdataTicketCategorize{
  let dataTicketCategorize = [
    {
      order : 1,
      status : "pending",
      dataFollowStatus : [] as any,
    },
    {
      order : 2,
      status : "accepted",
      dataFollowStatus : [] as any,
    },
    {
      order : 3,
      status : "rejected",
      dataFollowStatus : [] as any,
    },
    {
      order : 4,
      status : "resolved",
      dataFollowStatus : [] as any,
    }
  ]

  dataTicket.data.forEach((ticket : Tticket)=>{
    if(ticket.status === "pending")
      dataTicketCategorize[0].dataFollowStatus.push({...ticket})
    else if(ticket.status === "accepted")
      dataTicketCategorize[1].dataFollowStatus.push({...ticket})
    else if(ticket.status === "rejected")
      dataTicketCategorize[2].dataFollowStatus.push({...ticket})
    else if(ticket.status === "resolved")
      dataTicketCategorize[3].dataFollowStatus.push({...ticket})
    else
      console.log({message : "Error, status not found"})
  })
  return dataTicketCategorize as TdataTicketCategorize
}