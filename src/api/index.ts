import axios from "axios";
import {
  AddCommentArgs,
  AddPostArgs,
  NewUser,
  PostArgs,
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

export const deleteComment = async ({ id, accessToken }: PostArgs) => {
  await instance
    .delete(`/api/comments/${id}`, { headers: makeHeaders(accessToken) })
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
  id,
  accessToken,
  comments,
}: AddCommentArgs) => {
  await instance
    .put(
      `/api/posts/${id}/comments/${id}`,
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
  getPost,
  getPosts,
  getMyPosts,
  searchPost,
  addPost,
  deletePost,
  updatePost,
  postLike,
};

export const CommentApi = {
  addComment,
  updateComment,
  deleteComment,
};

export const AuthApi = {
  signup,
  signin,
};
