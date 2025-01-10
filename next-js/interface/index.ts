export type TstatusTicket = "pending" | "accepted" | "rejected" | "resolved"

export type Tticket = {
  id: number
  title: string 
  description: string 
  contact: string 
  status : TstatusTicket 
  create_at : string
  update_at : string
}

export type TdataTicketCategorize = {
    order : number,
    status : TstatusTicket,
    dataFollowStatus : Tticket[] | []
}[]