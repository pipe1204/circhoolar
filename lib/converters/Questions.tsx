import { db } from "@/firebase";
import { Question } from "@/types/Types";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
} from "firebase/firestore";

const QuestionConverter: FirestoreDataConverter<Question> = {
  toFirestore: function (question: Question): DocumentData {
    return { ...question };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Question {
    const data = snapshot.data(options);

    const question: Question = {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      topic: data.topic,
      audience: data.audience,
      identity: data.identity,
      link: data.link,
      images: data.images,
      createdAt: data.createdAt,
      authorId: data.authorId,
      author: data.author,
      avatar: data.avatar,
      schoolCode: data.schoolCode,
      updatedAt: data.updatedAt,
      schoolName: data.schoolName,
      numberOfComments: data.numberOfComments,
      numberOfLikes: data.numberOfLikes,
      likedBy: data.likedBy,
    };
    return question;
  },
};

export const questionRef = collection(db, "questions").withConverter(
  QuestionConverter
);
