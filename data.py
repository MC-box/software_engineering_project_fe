from pydantic import BaseModel
from datetime import datetime


class course(BaseModel):
    name: str
    key: int  # from 1000X


# 评论
class comment_user(BaseModel):
    id: int  # from 1
    username: str
    avatar: str  # 头像
    likeIds: list[int]  # contain the ids of those who like this comment
    comment: list[int]
    level: int


class comment(BaseModel):
    id: int
    parentId: int
    uid: int
    content: str
    likes: int
    createTime: datetime


# 题目
class exercise(BaseModel):
    homeworkid: int
    name: str
    description: str
    exType: str
    selectedOptions: list[str]  # 如果exType是选择题就启用，否则为空。一般为四个
    content: str  #
    point: float
    averagepoint: float
    difficulty: int  # easy : 1; medium : 2; hard : 3


class answer(BaseModel):
    homeworkid: int
    studentid: int
    point: float
    exType: str
    blankContent: str
    selectedAnswer: str


# 个人信息
class useInfo:
    name: str
    role: int  # 1为学生 2为老师
    telephone: str
    email: str
    StuNo: str
    interests: str
    comment_mylikes: int  # 评论点赞数
    wp_mylikes: int  # 题解点赞数
