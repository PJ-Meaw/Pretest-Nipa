import moment from "moment";

export function formatDate(date : string){
  return moment(new Date(date)).format("YYYY/MM/DD, HH:mm:ss");
}