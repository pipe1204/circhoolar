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
