import { set } from "zod";
import { create } from "zustand";
import { Notification } from "../types/Types";

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

interface commenterIdentityState {
  commenterIdentity: string | null;
  setCommenterIdentity: (commenterIdentity: string | null) => void;
}

export const useCommenterIdentityStore = create<commenterIdentityState>(
  (set) => ({
    commenterIdentity: null,
    setCommenterIdentity: (commenterIdentity: string | null) =>
      set({ commenterIdentity }),
  })
);

interface commentCountState {
  commentCount: number | null;
  setCommentCount: (commentCount: number | null) => void;
}

export const useCommentCountStore = create<commentCountState>((set) => ({
  commentCount: null,
  setCommentCount: (commentCount: number | null) => set({ commentCount }),
}));

interface likeCommentState {
  likeCommentCount: number | null;
  setLikeCommentCount: (likeCommentCount: number | null) => void;
}

export const useLikeCommentCountStore = create<likeCommentState>((set) => ({
  likeCommentCount: null,
  setLikeCommentCount: (likeCommentCount: number | null) =>
    set({ likeCommentCount }),
}));

interface likeQuestionState {
  likeQuestionCount: number | null;
  setLikeQuestionCount: (likeQuestionCount: number | null) => void;
}

export const useLikeQuestionCountStore = create<likeQuestionState>((set) => ({
  likeQuestionCount: null,
  setLikeQuestionCount: (likeQuestionCount: number | null) =>
    set({ likeQuestionCount }),
}));

interface itemsLocationState {
  itemsLocation: string | undefined;
  setItemsLocation: (itemsLocation: string | undefined) => void;
}

export const useItemsLocationStore = create<itemsLocationState>((set) => ({
  itemsLocation: undefined,
  setItemsLocation: (itemsLocation: string | undefined) =>
    set({ itemsLocation }),
}));

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

interface NotificationsState {
  notifications: Notification[] | null;
  setNotifications: (notifications: Notification[] | null) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: null,
  setNotifications: (notifications: Notification[] | null) =>
    set({ notifications }),
}));

interface UnreadNotificationsState {
  unreadNotifications: boolean | null;
  setUnreadNotifications: (unreadNotifications: boolean | null) => void;
}

export const useUnreadNotificationsStore = create<UnreadNotificationsState>(
  (set) => ({
    unreadNotifications: null,
    setUnreadNotifications: (unreadNotifications: boolean | null) =>
      set({ unreadNotifications }),
  })
);

interface hasOptOutNotificationsState {
  hasOptOutNotifications: string | null;
  setHasOptOutNotifications: (hasOptOutNotifications: string | null) => void;
}

export const useHasOptOutNotificationsStore =
  create<hasOptOutNotificationsState>((set) => ({
    hasOptOutNotifications: null,
    setHasOptOutNotifications: (hasOptOutNotifications: string | null) =>
      set({ hasOptOutNotifications }),
  }));

interface IsUnreadMessagesEmailSentState {
  isUnreadMessagesEmailSent: boolean | null;
  setIsUnreadMessagesEmailSent: (
    isUnreadMessagesEmailSent: boolean | null
  ) => void;
}

export const useIsUnreadMessagesEmailSentStore =
  create<IsUnreadMessagesEmailSentState>((set) => ({
    isUnreadMessagesEmailSent: false,
    setIsUnreadMessagesEmailSent: (isUnreadMessagesEmailSent: boolean | null) =>
      set({ isUnreadMessagesEmailSent }),
  }));

interface IsUnreadNotificationsEmailSentState {
  isUnreadNotificationsEmailSent: boolean | null;
  setIsUnreadNotificationsEmailSent: (
    isUnreadNotificationsEmailSent: boolean | null
  ) => void;
}

export const useIsUnreadNotificationsEmailSentStore =
  create<IsUnreadNotificationsEmailSentState>((set) => ({
    isUnreadNotificationsEmailSent: null,
    setIsUnreadNotificationsEmailSent: (
      isUnreadNotificationsEmailSent: boolean | null
    ) => set({ isUnreadNotificationsEmailSent }),
  }));

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
