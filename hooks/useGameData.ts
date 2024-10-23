import { useAsyncStorageItem } from "./useAsyncStorageItem";

export function useGameData(gameKey: string) {
  const { value: diceRolls, setValue: setDiceRolls } = useAsyncStorageItem<
    number[]
  >(gameKey, []);

  return { diceRolls, setDiceRolls };
}
