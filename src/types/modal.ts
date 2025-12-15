import { RefObject } from 'react'
import type { User } from './types'

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProp {
  mRef: RefObject<{
    open: (type: IAction, data?: User.UserItem) => void
  } | null>
  update: () => void
}
