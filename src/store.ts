import create from 'zustand'
import { UserState } from './interfaces'

const useStore = create<UserState>((set) => ({
  user: { isLoggedIn: false, email: '' },
  logIn: (email: string) => set((state) => ({ user: { isLoggedIn: true, email: email } })),
  logout: () => set({ user: { isLoggedIn: false, email: '' } }),
}))

export default useStore