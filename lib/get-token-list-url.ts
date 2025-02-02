const OCTA_SPACE_TOKEN_LIST_URL =
  process.env.NEXT_PUBLIC_OCTA_SPACE_TOKENLIST_URL;
const ETHEREUM_TOKEN_LIST_URL = process.env.NEXT_PUBLIC_ETHEREUM_TOKENLIST_URL;
const BSC_TOKEN_LIST_URL = process.env.NEXT_PUBLIC_BSC_TOKENLIST_URL;
const SEPOLIA_TOKEN_LIST_URL = process.env.NEXT_PUBLIC_SEPOLIA_TOKENLIST_URL;

export const getTokenListUrl = (chainId: number | undefined) => {
  if (!chainId) return "";

  switch (chainId) {
    case 800001:
      return OCTA_SPACE_TOKEN_LIST_URL;
    case 1:
      return ETHEREUM_TOKEN_LIST_URL;
    case 56:
      return BSC_TOKEN_LIST_URL;
    case 11155111:
      return SEPOLIA_TOKEN_LIST_URL;
    default:
      return "";
  }
};
