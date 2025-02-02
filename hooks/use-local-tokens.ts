import { useLocalStorageState } from "ahooks";

export default function useLocalTokens() {
  const [localTokens, setLocalTokens] = useLocalStorageState<Token[]>(
    "localTokens",
    {
      defaultValue: [],
    },
  );

  return [localTokens, setLocalTokens] as const;
}
