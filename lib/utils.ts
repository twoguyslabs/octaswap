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

export function matchQuery(token: Token | undefined, query: string) {
  const lowerCaseQuery = query.toLowerCase();
  return (
    token?.name?.toLowerCase().includes(lowerCaseQuery) ||
    token?.symbol?.toLowerCase().includes(lowerCaseQuery) ||
    token?.address?.toLowerCase().includes(lowerCaseQuery)
  );
}

export function hasToken(token: Token, tokens: Token[]) {
  return tokens.some((t) => t.address === token.address);
}

export function getAddress(token: Token | Native | undefined): `0x${string}` {
  if (!token) return "" as `0x${string}`;

  return "wrapped" in token
    ? (token.wrapped as `0x${string}`)
    : token.address
      ? (token.address as `0x${string}`)
      : ("" as `0x${string}`);
}

export function formatStringAmount(amount: string) {
  const num = Number(amount);
  return num > 1 ? num.toFixed(4) : amount;
}
