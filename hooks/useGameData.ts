import { useAllGameKeys } from "./useAllGameKeys";
import { useAsyncStorageItem } from "./useAsyncStorageItem";

export function useGameData(gameKey: string) {
  const { refetch } = useAllGameKeys();
  const { value: diceRolls, setValue: setDiceRolls } = useAsyncStorageItem<
    number[]
  >(gameKey, [], refetch);

  return { diceRolls, setDiceRolls };
}
