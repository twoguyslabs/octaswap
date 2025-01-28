import ethLogo from "@/assets/eth-logo.png";
import bscLogo from "@/assets/bnb-logo.svg";
import { StaticImageData } from "next/image";

interface ChainLogo {
  id: number;
  logo: StaticImageData;
}

const chainLogos: { [id: number]: ChainLogo } = {
  1: { id: 1, logo: ethLogo },
  56: { id: 56, logo: bscLogo },
  11155111: { id: 11155111, logo: ethLogo },
};

export function getLogoByChainId(
  chainId: number | undefined
): StaticImageData | undefined {
  if (!chainId) return undefined;

  const chainLogo = chainLogos[chainId];
  return chainLogo ? chainLogo.logo : undefined;
}
