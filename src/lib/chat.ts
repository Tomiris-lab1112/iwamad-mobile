import {
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  serverTimestamp,
} from 'firebase/database';
import { Platform } from 'react-native';
import { db } from './firebase';

export type ChatMessage = {
  id: string;
  author: string;
  text: string;
  sentAt: number;
  deviceId: string;
};

const MY_NAME = 'Tomiris';

export const AUTHOR = `${MY_NAME} (${Platform.OS})`;

// A new random ID every time the app starts
export const DEVICE_ID =
  'd-' + Math.random().toString(36).slice(2, 10);

export function sendMessage(eventId: number, text: string) {
  return push(ref(db, `chats/${eventId}/messages`), {
    author: AUTHOR,
    text,
    sentAt: serverTimestamp(),
    deviceId: DEVICE_ID,
  });
}

export function subscribeToChat(
  eventId: number,
  onMessages: (messages: ChatMessage[]) => void,
  onError: () => void
) {
  const chatQuery = query(
    ref(db, `chats/${eventId}/messages`),
    orderByChild('sentAt'),
    limitToLast(50)
  );

  return onValue(
    chatQuery,
    (snapshot) => {
      const messages: ChatMessage[] = [];

      snapshot.forEach((child) => {
        messages.push({
          id: child.key!,
          ...child.val(),
        });
      });

      onMessages(messages);
    },
    onError
  );
}
