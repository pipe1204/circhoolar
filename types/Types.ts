import { create } from "zustand";
import { Timestamp } from "firebase/firestore";
import { number } from "zod";

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
  schoolName: string;
  sellerHasBankDetails: boolean;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  link: string;
  authorId: string;
  author: string;
  avatar: string;
  schoolCode: string;
  images: string[];
  audience: "Private" | "Public";
  identity: "Real name" | "Anonymous";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  topic: string;
  schoolName: string;
  numberOfComments: number;
  comments: string[];
  numberOfLikes: number;
  likedBy: string[];
  commentedBy: string[];
}

export interface Comment {
  id: string;
  commentId: string;
  authorId: string;
  author: string;
  authorEmail: string;
  commenterIdentity: "Name" | "Anonymous";
  questionId: string;
  questionTitle: string;
  text: string;
  createdAt: Timestamp;
  numberOfLikes: number;
  likedBy: string[];
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
  hasBankDetails: boolean;
  bankDetails: BankDetails;
  likedQuestions: string[];
  likedComments: string[];
  notifications: Notification[];
  unreadMessages: number;
  isUnreadMessagesEmailSent: boolean;
  isUnreadnotificationsEmailSent: boolean;
  hasOptOutNotifications: boolean;
}

export interface Notification {
  id: string;
  text: string;
  read: boolean;
}

export interface BankDetails {
  bsbNumber: string;
  accountNumber: string;
  accountName: string;
}

export interface SchoolCode {
  id: string;
  schoolCode: string;
  name: string;
  donations: Donation[];
}

export interface Donation {
  id: string;
  institution: number;
  description: string;
  link: string;
}
