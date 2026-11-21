import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saved-event-ids';

export async function loadSavedIds(): Promise<number[]> {
  const stored = await AsyncStorage.getItem(KEY);

  if (!stored) {
    return [];
  }

  return JSON.parse(stored) as number[];
}

export async function saveSavedIds(ids: number[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(ids));
}
