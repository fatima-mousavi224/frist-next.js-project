import { techMap } from "@/constant/teachMap";
import { clsx, type ClassValue } from "clsx"
import { Key } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getDeviconClassname = (techName : string) => {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase();


  return (
    techMap[normalizedTechName] ?
    `${techMap[normalizedTechName]} colored` : "devicon-devicon-plain"
  )
}