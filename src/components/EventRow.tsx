import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type Props = {
  event: CampusEvent;
  saved?: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({
  event,
  saved = false,
  onPress,
  onLongPress,
}: Props) {
  const swipeRef = useRef<any>(null);

  function handleSave() {
    onLongPress();
    swipeRef.current?.close();
  }

  function renderRightActions() {
    return (
      <Pressable
        onPress={handleSave}
        style={[
          styles.action,
          saved ? styles.unsaveAction : styles.saveAction,
        ]}
      >
        <Text style={styles.actionText}>
          {saved ? 'Unsave' : 'Save'}
        </Text>
      </Pressable>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(250)}
      layout={LinearTransition.duration(200)}
      style={styles.row}
    >
      <Swipeable
        ref={swipeRef}
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.title}>{event.title}</Text>

          <Text style={styles.meta}>
            {event.date} · {event.place}
          </Text>

          {saved && (
            <Animated.View
              entering={FadeIn.duration(250)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.saved}>★ Saved</Text>
            </Animated.View>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 8,
  },
  card: {
    minHeight: 44,
    padding: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardPressed: {
    backgroundColor: '#dbeafe',
    borderColor: '#1d4ed8',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    fontSize: 14,
    color: '#475569',
    marginTop: 2,
  },
  saved: {
    fontSize: 14,
    color: '#b45309',
    marginTop: 4,
  },
  action: {
    width: 100,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  saveAction: {
    backgroundColor: '#16a34a',
  },
  unsaveAction: {
    backgroundColor: '#dc2626',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
