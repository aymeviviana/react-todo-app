import { getYears, getDays } from "./utils/dateHelpers";
export const ALL_TODOS_SECTION = "All Todos";
export const ALL_TODOS_GROUP = "All Todos";
export const COMPLETED_TODOS_SECTION = "Completed";
export const COMPLETED_TODOS_GROUP = "Completed";

export const ALL_TODOS_CLASS = "allTodos"
export const COMPLETED_TODOS_CLASS = "completedTodos"

export const ENDPOINT = "http://localhost:3001/api/todos";


export const DAYS = getDays(1, 31);

export const MONTHS = [
  { title: "January", value: "01"}, 
  { title: "February", value: "02" }, 
  { title: "March", value: "03" }, 
  { title: "April", value: "04" }, 
  { title: "May", value: "05" }, 
  { title: "June", value: "06" }, 
  { title: "July", value: "07" }, 
  { title: "August", value: "08" }, 
  { title: "September", value: "09" }, 
  { title: "October", value: "10" }, 
  { title: "November", value: "11" }, 
  { title: "December", value: "12" }, 
  
];

const startYear = (new Date()).getFullYear() - 9;
const endYear = startYear + 10;
export const YEARS = getYears(startYear, endYear);

