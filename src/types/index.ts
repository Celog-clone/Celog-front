export interface User {
  email: string;
  password: string;
}

export interface NewUser {
  nickname: string;
  email: string;
  password: string;
}

export interface TextField {
  label: string;
  color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  helperText: string;
}

export interface WholeColor {
  color: string;
  bgColor: string;
}

export interface PostCard {
  id: number;
  title: string;
  contents: string;
  image: string;
  nickname: string;
  likeCount: number;
  createAt: string;
  modifiedAt: string;
  commentList: Comment[];
}

export interface Comment {
  id: number;
  nickname: string;
  comments: string;
  createAt: string;
  modifiedAt: string;
}
