import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const baseurl =
  process.env.NEXT_PUBLIC_API_BASEURL ?? "https://vis-api.vercel.app/api";

function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) {
    return `${localPart}***@${domain}`;
  }
  const maskedLocalPart = `${localPart.slice(0, 2)}***`;
  return `${maskedLocalPart}@${domain}`;
}

/**
 * Shrink a string to a specified length(len).
 * @function shrinkString
 * @param {string} str
 * @param {number} len
 * @returns {string}
 */
const shrinkString = ({ str, len }: { str?: string; len: number }): string => {
  if (!str) return "";
  if (str.length > len) {
    return str.substring(0, len) + "...";
  }
  return str;
};

export { cn, baseurl, maskEmail, shrinkString };
