import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const ONE_MINUTE = 60 * 1000;

export function useAllGameKeys() {
  const {
    data: allKeys,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-game-keys"],
    queryFn: async () => {
      console.log("fetching all keys");
      return AsyncStorage.getAllKeys();
    },
    staleTime: ONE_MINUTE,
  });

  const sortedKeys = useMemo(() => allKeys && [...allKeys].sort(), [allKeys]);

  const lastKey = useMemo(
    () => sortedKeys?.[sortedKeys.length - 1],
    [sortedKeys]
  );

  return { allKeys: sortedKeys, lastKey, isLoading, refetch };
}
