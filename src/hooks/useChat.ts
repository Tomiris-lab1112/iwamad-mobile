import { useEffect, useState } from 'react';
import {
  DEVICE_ID,
  subscribeToChat,
  type ChatMessage,
} from '../lib/chat';
import {
  notifyNewMessage,
} from '../lib/notifications';

type ChatStatus = 'connecting' | 'live' | 'error';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('connecting');

  useEffect(() => {
    setStatus('connecting');

    // Remember messages already present when the chat opens.
    const seenIds = new Set<string>();
    let firstCall = true;

    const unsubscribe = subscribeToChat(
      eventId,
      (newMessages) => {
        setMessages(newMessages);
        setStatus('live');

        if (firstCall) {
          firstCall = false;
          newMessages.forEach((message) => {
            seenIds.add(message.id);
          });
          return;
        }

        for (const message of newMessages) {
          if (!seenIds.has(message.id)) {
            seenIds.add(message.id);

            if (message.deviceId !== DEVICE_ID) {
              void notifyNewMessage(eventTitle, message);
            }
          }
        }
      },
      () => {
        setStatus('error');
      }
    );

    return unsubscribe;
  }, [eventId, eventTitle]);

  return { messages, status };
}
