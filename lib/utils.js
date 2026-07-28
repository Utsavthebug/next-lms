import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { ObjectId } from "mongodb";


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function serializeData(data) {
  return JSON.parse(
    JSON.stringify(data, (_, value) => {
      if (value instanceof ObjectId) {
        return value.toHexString();
      }

      if (Buffer.isBuffer(value)) {
        return value.toString("base64");
      }

      return value;
    })
  );
}