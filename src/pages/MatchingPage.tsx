import MonthSelector from "../components/common/MonthSelector";
import DaySelector from "../components/common/DaySelector";

export default function MatchingPage() {
  const handleDateChange = (date: Date) => {
    console.log(date);
  };

  return (
    <>
      <MonthSelector initialDate={new Date()} onDateChange={handleDateChange} />
      <DaySelector selectedDate={new Date()} onDateChange={handleDateChange} />
    </>
  );
}
