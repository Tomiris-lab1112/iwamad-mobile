import { Pressable, StyleSheet, Text } from 'react-native';
import type { CampusEvent } from '../data/events';

type Props = {
  event: CampusEvent;
  saved?: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({ event, saved = false, onPress, onLongPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.date} · {event.place}
      </Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardPressed: { backgroundColor: '#dbeafe', borderColor: '#1d4ed8' },
  title: { fontSize: 18, fontWeight: '600' },
  meta: { fontSize: 14, color: '#475569', marginTop: 2 },
  saved: { fontSize: 14, color: '#b45309', marginTop: 4 },
});