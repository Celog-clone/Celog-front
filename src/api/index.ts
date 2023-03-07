import axios from "axios";
import {
  AddCommentArgs,
  AddPostArgs,
  DelCommentArgs,
  NewUser,
  PostArgs,
  UpdateCommentArgs,
  UpdatePostArgs,
  User,
} from "types";

const makeHeaders = (accessToken: string) => {
  return { Authorization: `Bearer ${accessToken}` };
};

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

export const signup = async (newUser: NewUser) => {
  try {
    const res = await instance.post("/api/members/signup", newUser);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};

export const signin = async (user: User) => {
  try {
    const res = await instance.post("/api/members/login", user);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};

export const getMyPosts = async (accessToken: string) => {
  try {
    const res = await instance.get("/api/mypage", {
      headers: makeHeaders(accessToken),
    });
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};

export const getPost = async (id: string) => {
  try {
    const res = await instance.get(`/api/posts/${id}`);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};

export const getPosts = async () => {
  try {
    const res = await instance.get("/api/posts");
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};

export const searchPost = async (keyword: string) => {
  try {
    const res = await instance.get(`/api/posts/search?name=${keyword}`);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};

export const addPost = async ({ accessToken, formData }: AddPostArgs) => {
  await instance
    .post("/api/posts", formData, {
      headers: {
        ...makeHeaders(accessToken),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const deletePost = async ({ id, accessToken }: PostArgs) => {
  await instance
    .delete(`/api/posts/${id}`, {
      headers: {
        ...makeHeaders(accessToken),
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const updatePost = async ({
  id,
  accessToken,
  formData,
}: UpdatePostArgs) => {
  await instance
    .patch(`/api/posts/${id}`, formData, {
      headers: {
        ...makeHeaders(accessToken),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const addComment = async ({
  id,
  accessToken,
  comments,
}: AddCommentArgs) => {
  await instance
    .post(
      `/api/posts/${id}/comments`,
      { comments },
      { headers: makeHeaders(accessToken) }
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const deleteComment = async ({
  postId,
  commentId,
  accessToken,
}: DelCommentArgs) => {
  await instance
    .delete(`/api/posts/${postId}/comments/${commentId}`, {
      headers: makeHeaders(accessToken),
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const updateComment = async ({
  postId,
  commentId,
  accessToken,
  comments,
}: UpdateCommentArgs) => {
  await instance
    .put(
      `/api/posts/${postId}/comments/${commentId}`,
      {
        comments,
      },
      { headers: makeHeaders(accessToken) }
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const postLike = async ({ id, accessToken }: PostArgs) => {
  await instance
    .post(`/api/posts/${id}/like`, {}, { headers: makeHeaders(accessToken) })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const PostApi = {
  getPost, //OK
  getPosts, //OK
  getMyPosts, //OK
  searchPost,
  addPost, //OK
  deletePost, //OK
  updatePost, //OK
  postLike, //OK
};

export const CommentApi = {
  addComment, //OK
  updateComment,
  deleteComment, //OK
};

export const AuthApi = {
  signup, //OK
  signin, //OK
};
