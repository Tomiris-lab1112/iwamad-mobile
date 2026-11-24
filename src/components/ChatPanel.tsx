import { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { sendMessage } from '../lib/chat';
import { useChat } from '../hooks/useChat';
import { askNotificationPermission } from '../lib/notifications';

type Props = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({
  eventId,
  eventTitle,
}: Props) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const { messages, status } = useChat(eventId, eventTitle);

  useEffect(() => {
    void askNotificationPermission();
  }, []);

  async function handleSend() {
    const trimmed = text.trim();

    if (!trimmed || sending) return;

    setSending(true);

    try {
      await sendMessage(eventId, trimmed);
      setText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>

      <TextInput
        style={styles.input}
        placeholder="Write a message"
        value={text}
        onChangeText={setText}
        maxLength={200}
      />

      <Pressable
        style={[
          styles.button,
          (!text.trim() || sending) && styles.disabled,
        ]}
        onPress={handleSend}
        disabled={!text.trim() || sending}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && (
        <Text>Connecting...</Text>
      )}

      {status === 'error' && (
        <Text>No messages yet</Text>
      )}

      {status === 'live' && messages.length === 0 && (
        <Text>No messages yet</Text>
      )}

      {status === 'live' &&
        [...messages].reverse().map((message) => (
          <Text key={message.id} style={styles.message}>
            {message.author}: {message.text}
          </Text>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  button: {
    minHeight: 44,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
});
