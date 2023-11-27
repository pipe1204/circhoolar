import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  description: string;
  author: string;
  school: string;
  images: string[];
  condition: string;
  value: string | number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  published: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    schoolCode: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    posts: Post[];
}

export interface SchoolCode {
    id: string;
    schoolCode: string;
    name: string;
}