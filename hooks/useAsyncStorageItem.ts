import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useAsyncStorageItem<T>(key: string, defaultValue: T) {
  const [value, setValueState] = useState<T>(defaultValue);

  const { getItem, setItem } = useAsyncStorage(key);

  const setValue = async (newValue: T) => {
    const previousValue = value;
    setValueState(newValue);
    try {
      await setItem(JSON.stringify(newValue));
    } catch (e) {
      setValueState(previousValue);
      alert(e);
    }
  };

  const readValue = async () => {
    let item: string | null;
    try {
      item = await getItem();
    } catch (e) {
      alert(e);
      return;
    }

    if (item === null) {
      await setValue(defaultValue);
      return;
    }

    setValueState(JSON.parse(item));
  };

  useEffect(() => {
    readValue();
  }, []);

  return { value, setValue };
}
