//@ts-nocheck

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { execSync } from "child_process";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// function getLastCommitDate(): Date {
//   try {
//     const result = execSync("git log -1 --format=%cd --date=iso")
//       .toString()
//       .trim();
//     return new Date(result);
//   } catch (error) {
//     return new Date("2024-01-01T00:00:00Z");
//   }
// }

export { cn };
