import { FACTORY, ROUTER } from "@/constants/dex";
import useChainId from "./use-chain-id";

export default function useDexConfig() {
  const chainId = useChainId();

  const { FACTORY_ADDRESS, FACTORY_ABI } = FACTORY[chainId];
  const { ROUTER_ADDRESS, ROUTER_ABI } = ROUTER[chainId];

  return { FACTORY_ADDRESS, FACTORY_ABI, ROUTER_ADDRESS, ROUTER_ABI };
}
