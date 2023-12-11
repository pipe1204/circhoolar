import {create} from 'zustand'
import {User} from '../types/Types'

interface SchoolCodeState {
    schoolCode: string | null;
    setSchoolCode: (schoolCode: string | null) => void;
}

export const useSchoolCodeStore = create<SchoolCodeState>((set) => ({
    schoolCode: null,
    setSchoolCode: (schoolCode: string | null) => set({schoolCode})
}))

interface UserNameState {
    userName: string | null;
    setUserName: (userName: string | null) => void;
    profileImage: string | null;
    setProfileImage: (userName: string | null) => void;
}

export const useUserNameStore = create<UserNameState>((set) => ({
    userName: null,
    setUserName: (userName: string | null) => set({userName}),
    profileImage: null,
    setProfileImage: (profileImage: string | null) => set({profileImage})
}))

interface SchoolNameState {
    schoolName: string | null;
    setSchoolName: (schoolName: string | null) => void;
}

export const useSchoolNameStore = create<SchoolNameState>((set) => ({
    schoolName: null,
    setSchoolName: (schoolName: string | null) => set({schoolName})
}))

interface SelectedSchoolState {
    selectedSchool: string | null;
    setSelectedSchool: (schoolName: string | null) => void;
}

export const useSelectedSchoolStore = create<SelectedSchoolState>((set) => ({
    selectedSchool: null,
    setSelectedSchool: (selectedSchool: string | null) => set({selectedSchool})
}))

interface CategoriesState {
    categories: string[] | null;
    setCategories: (categories: string[] | null) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
    categories: null,
    setCategories: (categories: string[] | null) => set({categories})
}))

interface TotalUnreadMessagesState {
    totalUnreadMessages: number | null;
    setTotalUnreadMessages: (totalUnreadMessages: number | null) => void;
}

export const useTotalUnreadMessagesStore = create<TotalUnreadMessagesState>((set) => ({
    totalUnreadMessages: null,
    setTotalUnreadMessages: (totalUnreadMessages: number | null) => set({totalUnreadMessages})
}))