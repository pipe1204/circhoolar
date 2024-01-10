import { set } from "zod";
import { create } from "zustand";
import { User } from "../types/Types";

interface SchoolCodeState {
  schoolCode: string | null;
  setSchoolCode: (schoolCode: string | null) => void;
}

export const useSchoolCodeStore = create<SchoolCodeState>((set) => ({
  schoolCode: null,
  setSchoolCode: (schoolCode: string | null) => set({ schoolCode }),
}));

interface UserNameState {
  userName: string | null;
  setUserName: (userName: string | null) => void;
  profileImage: string | null;
  setProfileImage: (userName: string | null) => void;
}

export const useUserNameStore = create<UserNameState>((set) => ({
  userName: null,
  setUserName: (userName: string | null) => set({ userName }),
  profileImage: null,
  setProfileImage: (profileImage: string | null) => set({ profileImage }),
}));

interface SchoolNameState {
  schoolName: string | null;
  setSchoolName: (schoolName: string | null) => void;
}

export const useSchoolNameStore = create<SchoolNameState>((set) => ({
  schoolName: null,
  setSchoolName: (schoolName: string | null) => set({ schoolName }),
}));

interface SelectedSchoolState {
  selectedSchool: string | null;
  setSelectedSchool: (schoolName: string | null) => void;
}

export const useSelectedSchoolStore = create<SelectedSchoolState>((set) => ({
  selectedSchool: null,
  setSelectedSchool: (selectedSchool: string | null) => set({ selectedSchool }),
}));

interface CategoriesState {
  categories: string[] | null;
  setCategories: (categories: string[] | null) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: null,
  setCategories: (categories: string[] | null) => set({ categories }),
}));

interface TopicState {
  topic: string | null;
  setTopic: (topic: string | null) => void;
}

export const useTopicStore = create<TopicState>((set) => ({
  topic: null,
  setTopic: (topic: string | null) => set({ topic }),
}));

interface audienceSelectedState {
  audienceSelected: string | null;
  setAudienceSelected: (audienceSelected: string | null) => void;
}

export const useAudienceSelectedStore = create<audienceSelectedState>(
  (set) => ({
    audienceSelected: null,
    setAudienceSelected: (audienceSelected: string | null) =>
      set({ audienceSelected }),
  })
);

interface TotalUnreadMessagesState {
  totalUnreadMessages: number | null;
  setTotalUnreadMessages: (totalUnreadMessages: number | null) => void;
}

export const useTotalUnreadMessagesStore = create<TotalUnreadMessagesState>(
  (set) => ({
    totalUnreadMessages: null,
    setTotalUnreadMessages: (totalUnreadMessages: number | null) =>
      set({ totalUnreadMessages }),
  })
);

interface CurrentChatState {
  currentChatId: string | null;
  setCurrentChatId: (chatId: string | null) => void;
}

export const useCurrentChatStore = create<CurrentChatState>((set) => ({
  currentChatId: null,
  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
}));

interface BankDetailsState {
  hasBankDetails: boolean | null;
  bsbNumber: string | null;
  accountNumber: string | null;
  accountName: string | null;
  setHasBankDetails: (hasBankDetails: boolean | null) => void;
  setBsbNumber: (bsbNumber: string | null) => void;
  setAccountNumber: (accountNumber: string | null) => void;
  setAccountName: (accountName: string | null) => void;
  setBankDetails: (
    bsbNumber: string | null,
    accountNumber: string | null,
    accountName: string | null
  ) => void;
}

export const useBankDetailsStore = create<BankDetailsState>((set) => ({
  hasBankDetails: null,
  bsbNumber: null,
  accountNumber: null,
  accountName: null,
  setHasBankDetails: (hasBankDetails) => set({ hasBankDetails }),
  setBsbNumber: (bsbNumber) => set({ bsbNumber }),
  setAccountNumber: (accountNumber) => set({ accountNumber }),
  setAccountName: (accountName) => set({ accountName }),
  setBankDetails: (bsbNumber, accountNumber, accountName) =>
    set({ bsbNumber, accountNumber, accountName }),
}));
