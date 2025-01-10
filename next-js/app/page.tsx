import Home from "./Home";
import axios from "axios";
import { TdataTicketCategorize, Tticket } from "@/interface";
import { categorizeTicket } from "@/utils/categorizeTicket";

export default async function Main() {

  try{ 
    const { data : dataTicket } = await axios.get("http://127.0.0.1:8000/tickets")
    const dataTicketCategorize = categorizeTicket(dataTicket)
    console.log(dataTicketCategorize)
    return (
      <Home dataTicketCategorize={dataTicketCategorize as TdataTicketCategorize}/>
    );
  }catch(error){
    throw(error)
  }
}
