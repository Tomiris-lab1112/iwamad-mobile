import { useEffect, useState } from 'react';
import {
  loadSavedIds,
  saveSavedIds,
} from '../lib/savedStorage';

export function useSavedIds() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    loadSavedIds().then(setSavedIds);
  }, []);

  function toggleSaved(id: number) {
    setSavedIds((previous) => {
      const next = previous.includes(id)
        ? previous.filter((x) => x !== id)
        : [...previous, id];

      saveSavedIds(next);
      return next;
    });
  }

  return { savedIds, toggleSaved };
}
