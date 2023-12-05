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