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

export function matchQuery(token: UnionToken, query: string) {
  const lowerCaseQuery = query.toLowerCase();
  return (
    token?.name?.toLowerCase().includes(lowerCaseQuery) ||
    token?.symbol?.toLowerCase().includes(lowerCaseQuery) ||
    token?.address?.toLowerCase().includes(lowerCaseQuery)
  );
}

export function hasToken(token: UnionToken, tokens: UnionToken[]) {
  return tokens.some((t) => t.address === token.address);
}

export function formatStringAmount(amount: string) {
  const num = Number(amount);
  return num > 1 ? num.toFixed(4) : amount;
}

export function mockToken(): UnionToken {
  return {
    chainId: 0,
    address: "0x",
    name: "",
    symbol: "",
    decimals: 0,
    logoURI: "",
    isNative: false,
  };
}
