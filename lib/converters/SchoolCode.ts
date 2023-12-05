import { db } from "@/firebase";
import { SchoolCode } from "@/types/Types";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, collection, doc } from "firebase/firestore";

const SchoolCodeConverter: FirestoreDataConverter<SchoolCode> = {
    toFirestore: function (code: SchoolCode): DocumentData {
        return {...code}
    },
    fromFirestore: function(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): SchoolCode {
        const data = snapshot.data(options);

        const code: SchoolCode = {
            id: snapshot.id,
            schoolCode: snapshot.id,
            name: data.name
        } 
        return code;
    }
}

export const codeRef = collection(db, 'schools').withConverter(SchoolCodeConverter);
