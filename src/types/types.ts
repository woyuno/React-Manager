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

  // 创建用户类型
  export interface CreatePrams {
    userName: string
    userEmail: string
    mobile?: number
    deptId: string
    job?: string
    state?: number
    roleList: string[]
  }
  // 编辑用户类型
  export interface EditPrams extends CreatePrams {
    userId: number
  }
}

export namespace Dept {
  export interface Params {
    deptName?: string
  }

  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }
  export interface EditParams extends CreateParams {
    id: string
  }

  export interface DeptItem {
    _id: string
    createTime: string
    updateTime: string
    deptName: string
    parentId: string
    userName: string
    children: DeptItem[]
  }
}
export namespace Menu {
  export interface Params {
    menuName: string
    menuState: number
  }
  export interface CreateParams {
    menuName: string
    icon?: string
    menuType: number
    menuState: number
    menuCode?: string
    parentId?: string
    path?: string
    component?: string
    orderBy: number
  }
  export interface MenuItem extends CreateParams {
    _id: string
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
  }
  export interface EditParams extends CreateParams {
    _id: string
  }
}
