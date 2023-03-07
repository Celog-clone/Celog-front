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

export interface PostCardDetail {
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

export interface PostCard {
  id: number;
  title: string;
  contents: string;
  image: string;
  nickname: string;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
  commentsCount: number;
}

export interface Comment {
  id: number;
  nickname: string;
  comments: string;
  createAt: string;
  modifiedAt: string;
}

export interface AddPostArgs {
  accessToken: string;
  formData: FormData;
}

export interface PostArgs {
  id: string;
  accessToken: string;
}

export interface UpdatePostArgs extends PostArgs {
  formData: FormData;
}

export interface DelCommentArgs {
  postId: string;
  commentId: string;
  accessToken: string;
}

export interface AddCommentArgs extends PostArgs {
  comments: string;
}

export interface UpdateCommentArgs extends DelCommentArgs {
  comments: string;
}
