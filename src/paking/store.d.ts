export namespace User {
    interface userInfo {
      // name: string // 实名
      // schoolID: string // 学号/教工号
      // password: string // 密码
      // email: string // 邮箱
      // avatar: string // 头像路径，有默认头像
      // // major?: string // 专业，老师没有专业
      // // college: string // 学院
      // role: -1 | 0 | 1 | 2 // -1默认值，0为管理员，1为学生，2为老师
      // isAdmin: boolean
      // token?: string // token
      userid: number,
      username: string,
      password: string,
      email: string,
      role: number,
      telephone: string,
      major: string
    }

    interface token{
      access_token: string // token值
      token_type: string // 加密方式
    }
  }

  export namespace Exercise{
    interface exercisesInfo{
      problemid: number
      name: string
      problemType: string
      point: number
      difficult: string
    }
    interface Choice{
      choiceid: number,
      content: string,
      problemid: number,
      label: string,
      iscorrect: number
    }
    interface exerciseInfo{
      problemid: number,
      name: string,
      problemType: string,
      content: string,
      point: number,
      difficult: string,
      homeworkid: number,
      choice: Choice[]
    }
  }
    
  
  export namespace Problem {
    type Tag = {
      tagName: string
    }
  
    type Order = {
      orderBy: string
      sortOrder: "DESC" | "ASC" | ""
    }
  
    interface problem {
      // TODO: 具体命名id
      id: number // 题目id
      title: string // 题目标题
      question: string // 题目内容
      courseName: string // 课程
      category: "选择" | "填空" | "大题" | "代码" | "" // 题目类型
      difficulty: 0 | 1 | 2 | 3 // 难度，0-用于筛选全部，1-简单，2-中等，3-困难
      tags: Tag[] | [] // 题目标签
      Cnt: number // 通过人数
      favour: boolean // 是否收藏
      pass: boolean // 是否做过
      schoolId: number // 出题人id
      ans: string // 题目答案
      deletedAt?: Date
    }
  
    interface filters {
      category?: string // 题目类型
      courseName?: string // 课程
      searcherKeyWords?: string | number // 题目 或 题目id
      orders?: Order[] | []
      tag?: string // 标签
      difficulty?: number
      offset: number // 偏移，首页为0
      limit: number // 分页大小
    }
  }
  
  export namespace Favor {
    interface favorite {
      id: number // id
      title: string // 题目搜索
      subject: string // 学科
      count: number // 做过人数
      content: string // 内容
      isDone: boolean // 做过？
    }
  
    interface favorSet {
      data: favorite[]
    }
  }
  
  export namespace Solution {
    interface Solution {
      id: number
      title: string
      content: string
      schoolId: number
      comments: Comment[]
      createdAt: string
    }
  
    interface Comment {
      commmentid: number // 评论id
      content: string // 文本
      createAt: string // 创建时间
      contributorname: string
      contributorrole: number
    }

    interface CommentReq {
      content: string
      createAt: string
    }
  }
export namespace Course{
  interface courseInfo{
    courseid: int
    name: string
    info: string
    teacherid: string
  }
  
}

export namespace WriteUp{
  interface WriteupInfo{
    solutionid: int
    name: string
    author: string
  }

  interface WriteupInfo_content{
    solutionid: int
    name: string
    content: string
    author: string
  }

  interface WriteUpInfo_submit{
    problemid: int
    content: string
    contributorid: int
    name: string
  }
} 

export namespace Attempt{
  interface attemptInfo{
    problemid: int
    content: string
  }

  interface attemptInfo_return{
    problemid: int
    studentid: int
    point: int
    content: string
  }
}

export interface ValidationFail{
  detail: [
    {
      loc: [
        string,
        int
      ],
      msg: string,
      type: string
    }
  ]
}
  

export namespace Homework{
    interface homework_submit{
      homeworkname: string,
      duedate: Date,
      courseid: number
    }

    interface homework_return{
      homeworkid: number
      homeworkname: string,
      duedate: Date,
      courseid: number
    }
}