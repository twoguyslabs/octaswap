import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split("/").filter(Boolean);
  return paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    return { href, label: path.charAt(0).toUpperCase() + path.slice(1) };
  });
}

export function hasDecimal(num: number | string): boolean {
  return typeof num === "number"
    ? num.toString().includes(".")
    : num.toString().includes(".");
}
