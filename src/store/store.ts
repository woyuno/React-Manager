import { User } from '@/types/types'
import { create } from 'zustand'

interface userBear {
  userInfo: {
    userEmail: string
    userName: string
  },
  updateUserInfo:(userInfo: User.UserItem)=>void
}
export const userBearStore = create<userBear>(set => ({
  userInfo: {
    userEmail: '',
    userName: '',
  },
  updateUserInfo: (userInfo: User.UserItem) => {
    set({
      userInfo,
    })
  },
}))
