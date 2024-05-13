import { Holiday } from "@/model/holidayModel";
import axios from "axios";


const holidayHttp = axios.create({
  baseURL: import.meta.env.VITE_HOLIDAY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const countryCode = "BR";

async function fetchHolidays(year: number): Promise<Holiday[] | undefined> {
  try {
    const response = await holidayHttp.get(`/${year}/${countryCode}`);
    const holidays = response.data as Holiday[];
    return holidays;
  } catch (error) {
    console.error(`Error fetching public holidays for ${year}:`, error);
  }
}

export const holidayService = {
  fetchHolidays
};

