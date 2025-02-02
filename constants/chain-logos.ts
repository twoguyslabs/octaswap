interface ChainLogo {
  id: number;
  logoURL: string;
}

const chainLogos: { [id: number]: ChainLogo } = {
  800001: { id: 800001, logoURL: "/octa-logo.svg" },
  1: { id: 1, logoURL: "/eth-logo.png" },
  56: { id: 56, logoURL: "/bnb-logo.svg" },
  11155111: { id: 11155111, logoURL: "/eth-logo.png" },
};

export function getChainLogoByChainId(
  chainId: number | undefined,
): string | undefined {
  if (!chainId) return undefined;

  const chainLogo = chainLogos[chainId];
  return chainLogo ? chainLogo.logoURL : undefined;
}
