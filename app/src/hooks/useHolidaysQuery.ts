import { Holiday } from "@/model/holidayModel"
import { holidayService } from "@/service/holidayService"
import { useQuery } from "react-query"

export const useHolidaysQuery = (year: number) => {

  const { data, isLoading } = useQuery({
    queryKey: ['holidays', year],
    queryFn: () => holidayService.fetchHolidays(year)
  })

  const getHoliday = (date: Date): Holiday | undefined => {
    if (!data) return
    const dateString = date.toISOString().split('T')[0]
    return data.find(h => h.date === dateString)
  }

  return { holidays: data, isLoading, getHoliday }

}