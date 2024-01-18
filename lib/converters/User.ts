import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  doc,
  collection,
} from "firebase/firestore";
import { User } from "@/types/Types";
import { db } from "@/firebase";

const UserConverter: FirestoreDataConverter<User> = {
  toFirestore: function (user: User): DocumentData {
    return { ...user };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);

    const user: User = {
      id: snapshot.id,
      name: data.name,
      email: data.email,
      image: data.image,
      schoolCode: data.schoolCode,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      posts: data.posts,
      hasBankDetails: data.hasBankDetails,
      bankDetails: data.bankDetails,
      likedQuestions: data.likedQuestions,
      likedComments: data.likedComments,
      notifications: data.notifications,
      unreadNotifications: data.unreadNotifications,
    };
    return user;
  },
};

export const userRef = (userId: string) =>
  doc(db, "users", userId).withConverter(UserConverter);

export const usersRef = collection(db, "users").withConverter(UserConverter);
