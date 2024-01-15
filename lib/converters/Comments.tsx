import { db } from "@/firebase";
import { Comment } from "@/types/Types";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const CommentConverter: FirestoreDataConverter<Comment> = {
  toFirestore: function (comment: Comment): DocumentData {
    return { ...comment };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Comment {
    const data = snapshot.data(options);

    const comment: Comment = {
      id: snapshot.id,
      authorId: data.authorId,
      author: data.author,
      commenterIdentity: data.commenterIdentity,
      questionId: data.questionId,
      questionTitle: data.questionTitle,
      text: data.text,
      createdAt: data.createdAt,
      numberOfLikes: data.numberOfLikes,
    };
    return comment;
  },
};

export const commentRef = collection(db, "comments").withConverter(
  CommentConverter
);

export const sortedCommentsRef = (questionId: string) =>
  query(
    commentRef,
    where("questionId", "==", questionId),
    orderBy("createdAt", "desc")
  );
