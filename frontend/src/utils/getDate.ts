import { formatInTimeZone } from "date-fns-tz";
import { addDays } from "date-fns";
export const getDaysBetween = (dateInput: Date | string | number): string => {
  const date = new Date(dateInput);
  const now = new Date();
  // Calculate difference in seconds
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  // // Scenario 1: Future dates or just now (0 seconds)
  // if (diffInSeconds <= 0) {
  //   return "just now";
  // }
  // // Scenario 2: Less than 1 minute ago
  // if (diffInSeconds < 60) {
  //   return `${diffInSeconds} sec ago`;
  // }
  // // Scenario 3: Less than 1 hour ago (60 minutes)
  // const diffInMinutes = Math.floor(diffInSeconds / 60);
  // if (diffInMinutes < 60) {
  //   return `${diffInMinutes} min ago`;
  // }
  // Scenario 4: Greater than 24 hours (86,400 seconds)
  if (diffInSeconds >= 86400) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // e.g., "Feb"
    if (date.getFullYear() === now.getFullYear()) {
      return `${day} ${month}`;
    }
    const year = date.getFullYear().toString().slice(-2); // e.g., "26"
    return `${day} ${month} ${year}`;
  }
  // Scenario 5: Greater than or equal to 1 hour -> Return 09:40AM format
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getNextDate = (daysToAdd = 0) => {
  const now = new Date();
  const futureDate = addDays(now, daysToAdd);
  const timeZone = "Asia/Kolkata";

  return formatInTimeZone(futureDate, timeZone, "dd-MM-yyyy_HH:mm:ss");
};
export const formatDateTime = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${dd}-${mm}-${yyyy}_${hh}:${min}:${ss}`;
};
