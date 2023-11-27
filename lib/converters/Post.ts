import { db } from "@/firebase";
import { Post } from "@/types/Types";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, collection } from "firebase/firestore";

const PostConverter: FirestoreDataConverter<Post> = {
    toFirestore: function (post: Post): DocumentData {
        return {...post}
    },
    fromFirestore: function(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Post {
        const data = snapshot.data(options);

        const post: Post = {
            id: snapshot.id,
            title: data.title,
            description: data.description,
            value: data.value,
            condition: data.condition,
            images: data.images,
            createdAt: data.createdAt,
            author: data.author,
            school: data.school,
            updatedAt: data.updatedAt,
            published: data.published
        } 
        return post;
    }
}

export const postRef = (userId: string) => collection(db, 'users', userId, 'posts').withConverter(PostConverter);
