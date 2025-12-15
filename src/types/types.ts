// 通用接口类型定义
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}
// 通用分页列表
export interface ResultPage<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number
  }
}
// 通用分页参数
export interface PageParams {
  pageNum: number
  pageSize: number
}

export namespace Login {
  export interface params {
    userName: string
    password: string
  }
}

export namespace User {
  export interface params extends PageParams {
    userId?: number
    userName?: string
    userEmail?: number
  }
  export interface UserItem {
    _id?: string
    userId?: number
    userName?: string
    userEmail?: string
    // deptId: string
    state?: number
    // mobile: string
    // job: string
    role?: string
    // roleList: string
    // createId: number
    // deptName: string
    // userImg: string
  }
}
