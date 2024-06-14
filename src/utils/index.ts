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

/**
 * Returns an Encrypted a string .
 * @function encryptString - Encodes or encrypts a string using a base64 Buffer
 * @returns A encoded string .
 */
const encryptString = (str: string): string => {
  const buffer = Buffer.from(str);
  return buffer.toString("base64");
};

/**
 * Decodes and Returns a string .
 * @function decryptString - Decodes or decrypts an encrypted string Buffer
 * @returns A decoded string .
 */

const decryptString = (str: string): string => {
  const buffer = Buffer.from(str, "base64");
  return buffer.toString();
};

/**
 * Returns a human-readable string representing the time elapsed since the given date.
 * @function timeAgo
 * @param {Date} date - The date to compare with the current date and time.
 * @returns {string} A human-readable string indicating the time elapsed since the given date.
 */
const timeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  const timeUnits: [number, string][] = [
    [60 * 60 * 24, "day"],
    [60 * 60, "hour"],
    [60, "minute"],
    [1, "second"],
  ];

  for (const [unitInSeconds, unitName] of timeUnits) {
    const elapsedUnits = Math.floor(diffInSeconds / unitInSeconds);
    if (elapsedUnits >= 1) {
      return `${elapsedUnits} ${unitName}${elapsedUnits > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export {
  cn,
  baseurl,
  maskEmail,
  shrinkString,
  encryptString,
  decryptString,
  timeAgo,
};
