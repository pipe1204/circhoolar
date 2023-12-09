import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  description: string;
  authorId: string;
  author: string;
  avatar: string;
  schoolCode: string;
  images: string[];
  condition: "Great condition" | "Good condition" | "Fair condition";
  sellingmethod: "Free" | "Cost";
  price: string | number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: string;
  isSold: boolean;
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