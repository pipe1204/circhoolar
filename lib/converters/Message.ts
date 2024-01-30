import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";

export interface ChatUser {
  id: string;
  email: string;
  name: string;
  image: string;
}

export interface Message {
  id: string;
  text: string;
  isRead: boolean;
  timestamp: Date | null;
  sender: ChatUser;
  receiver: ChatUser;
}

const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore: function (message: Message): DocumentData {
    return {
      text: message.text,
      isRead: message.isRead,
      timestamp: message.timestamp,
      sender: message.sender,
      receiver: message.receiver,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      text: data.text,
      isRead: data.isRead,
      timestamp: data.timestamp?.toDate(),
      sender: data.sender,
      receiver: data.receiver,
    };
  },
};

export const MessagesRef = (chatId: string) =>
  collection(db, "chats", chatId, "messages").withConverter(messageConverter);

export const sortedMessagesRef = (chatId: string) =>
  query(MessagesRef(chatId), orderBy("timestamp", "asc"));

export const limitedSortedMessagesRef = (chatId: string) =>
  query(query(MessagesRef(chatId), limit(1)), orderBy("timestamp", "asc"));
