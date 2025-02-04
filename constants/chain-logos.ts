const chainLogos: { [id: number]: ChainLogo } = {
  800001: { id: 800001, logoURI: "/octa-logo.svg" },
  1: { id: 1, logoURI: "/eth-logo.png" },
  56: { id: 56, logoURI: "/bnb-logo.svg" },
  11155111: { id: 11155111, logoURI: "/eth-logo.png" },
};

export function getChainLogoByChainId(chainId: number | undefined): string | undefined {
  if (!chainId) return undefined;

  const chainLogo = chainLogos[chainId];
  return chainLogo ? chainLogo.logoURI : undefined;
}
