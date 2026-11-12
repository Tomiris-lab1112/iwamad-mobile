import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import EventRow from '../../src/components/EventRow';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = useEvents();

  const visible = (data ?? []).filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  function toggleSaved(id: number) {
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );
  }

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable
          onPress={() => refetch()}
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search events"
        value={query}
        onChangeText={setQuery}
      />

      <Text style={styles.hint}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <FlatList
        data={visible}
        keyExtractor={(e) => String(e.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={<Text>No events match.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 16,
  paddingTop: 110,
  backgroundColor: '#fff',
},
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  hint: {
    marginBottom: 12,
    color: '#475569',
  },
  retryButton: {
    minHeight: 44,
    padding: 12,
    marginTop: 12,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
