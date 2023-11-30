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
            sellingmethod: data.sellingmethod,
            price: data.price,
            condition: data.condition,
            images: data.images,
            createdAt: data.createdAt,
            authorId: data.authorId,
            author: data.author,
            avatar: data.avatar,
            schoolCode: data.schoolCode,
            updatedAt: data.updatedAt,
            category: data.category
        } 
        return post;
    }
}

export const postRef = collection(db, 'posts').withConverter(PostConverter);
