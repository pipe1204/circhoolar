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
}

export const useUserNameStore = create<UserNameState>((set) => ({
    userName: null,
    setUserName: (userName: string | null) => set({userName})
}))