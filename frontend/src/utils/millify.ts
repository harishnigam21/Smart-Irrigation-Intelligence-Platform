import { millify } from "millify";

export const millifyNum = (num: number) => {
  const customFormat = millify(num, {
    precision: 2, // Number of decimal places
    lowercase: false, // Use "k" and "m" instead of "K" and "M"
    space: false, // Adds a space between number and suffix (e.g., "1.25 m")
  });
  return customFormat;
};
