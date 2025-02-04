import { useLocalStorageState } from "ahooks";
import useChainId from "./use-chain-id";

export default function useLocalTokens() {
  const chainId = useChainId();

  const [localTokens, setLocalTokens] = useLocalStorageState<{ [chainId: number]: UnionToken[] }>("localTokens", {
    defaultValue: {},
  }) as [{ [chainId: number]: UnionToken[] }, (value: { [chainId: number]: UnionToken[] }) => void];

  const localTokensByChainId = localTokens[chainId] || [];

  const setLocalTokensByChainId = (token: UnionToken) => {
    const updatedTokens = [...localTokensByChainId, token];

    setLocalTokens({
      ...localTokens,
      [chainId]: updatedTokens,
    });
  };

  return {
    localTokens: localTokensByChainId,
    setLocalTokens: setLocalTokensByChainId,
  };
}
