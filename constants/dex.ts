import { BSC_V2_FACTORY_ABI, BSC_V2_FACTORY_ADDRESS } from "@/contracts/bsc/dex/bsc-v2-factory";
import { BSC_V2_ROUTER_ABI, BSC_V2_ROUTER_ADDRESS } from "@/contracts/bsc/dex/bsc-v2-router";
import { OCTA_V2_FACTORY_ABI, OCTA_V2_FACTORY_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-factory";
import { OCTA_V2_ROUTER_ABI, OCTA_V2_ROUTER_ADDRESS } from "@/contracts/octaspace/dex/octa-v2-router";
import { SEP_V2_FACTORY_ABI, SEP_V2_FACTORY_ADDRESS } from "@/contracts/sepolia/dex/sep-v2-factory";
import { SEP_V2_ROUTER_ABI, SEP_V2_ROUTER_ADDRESS } from "@/contracts/sepolia/dex/sep-v2-router";
import { Address } from "viem";

type FactoryABI = typeof BSC_V2_FACTORY_ABI | typeof OCTA_V2_FACTORY_ABI | typeof SEP_V2_FACTORY_ABI;
type RouterABI = typeof BSC_V2_ROUTER_ABI | typeof OCTA_V2_ROUTER_ABI | typeof SEP_V2_ROUTER_ABI;

export const FACTORY: {
  [chainId: number]: { FACTORY_ADDRESS: Address; FACTORY_ABI: FactoryABI };
} = {
  800001: {
    FACTORY_ADDRESS: OCTA_V2_FACTORY_ADDRESS,
    FACTORY_ABI: OCTA_V2_FACTORY_ABI,
  },
  56: {
    FACTORY_ADDRESS: BSC_V2_FACTORY_ADDRESS,
    FACTORY_ABI: BSC_V2_FACTORY_ABI,
  },
  11155111: {
    FACTORY_ADDRESS: SEP_V2_FACTORY_ADDRESS,
    FACTORY_ABI: SEP_V2_FACTORY_ABI,
  },
};

export const ROUTER: { [chainId: number]: { ROUTER_ADDRESS: Address; ROUTER_ABI: RouterABI } } = {
  800001: {
    ROUTER_ADDRESS: OCTA_V2_ROUTER_ADDRESS,
    ROUTER_ABI: OCTA_V2_ROUTER_ABI,
  },
  56: {
    ROUTER_ADDRESS: BSC_V2_ROUTER_ADDRESS,
    ROUTER_ABI: BSC_V2_ROUTER_ABI,
  },
  11155111: {
    ROUTER_ADDRESS: SEP_V2_ROUTER_ADDRESS,
    ROUTER_ABI: SEP_V2_ROUTER_ABI,
  },
};
