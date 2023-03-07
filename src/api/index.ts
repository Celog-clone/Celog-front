import axios from "axios";
import { NewUser, User } from "types";

const makeHeaders = (accessToken: string) => {
  return { Authorization: `Bearer ${accessToken}` };
};

export const instance = axios.create({
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

export const getMyPosts = async (nickname: string, accessToken: string) => {
  try {
    const res = await instance.get(`/api/mypage?nickname=${nickname}`, {
      headers: makeHeaders(accessToken),
    });
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};

export const getPost = async () => {
  const response = await instance.get("/api/posts");
  return response.data.response;
};

interface AddPostPayload {
  accessToken: string;
  formData: FormData;
}
export const addPost = async ({ accessToken, formData }: AddPostPayload) => {
  await instance
    .post("/api/posts", formData, {
      headers: {
        ...makeHeaders(accessToken),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // if (response.data.success === true) {
      console.log(response);
      return response;
      // }
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const deletePost = async (id: string, accessToken: string) => {
  await instance
    .delete(`/api/posts/${id}`, {
      headers: {
        ...makeHeaders(accessToken),
      },
    })
    .then((response) => {
      // if (response.data.success === true) {
      console.log(response);
      return response;
      // }
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const updatePost = async (
  id: string,
  accessToken: string,
  payload: any
) => {
  await instance
    .patch(
      `/api/posts/${id}`,
      {
        title: payload.title,
        contents: payload.contents,
        image: payload.image,
      },
      {
        headers: {
          ...makeHeaders(accessToken),
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      // if (response.data.success === true) {
      console.log(response);
      return response;
      // }
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const addComment = async (
  id: any,
  accessToken: string,
  comments: string
) => {
  await instance
    .post(
      `/api/posts/${id.id}/comments`,
      { comments: id.comments },
      {
        headers: {
          ...makeHeaders(accessToken),
        },
      }
    )
    .then((response) => {
      if (response.data.success === true) {
        console.log(response);
        return response;
      }
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const deleteComment = async (id: string, accessToken: string) => {
  await instance
    .delete(`/api/posts/${id}/comments/${id}`, {
      headers: {
        ...makeHeaders(accessToken),
      },
    })
    .then((response) => {
      // if (response.data.success === true) {
      console.log(response);
      return response;
      // }
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const updateComment = async (
  id: string,
  accessToken: string,
  updateComments: string
) => {
  await instance
    .put(
      `/api/posts/${id}/comments/${id}`,
      {
        comments: updateComments,
      },
      {
        headers: {
          ...makeHeaders(accessToken),
        },
      }
    )
    .then((response) => {
      if (response.data.success === true) {
        console.log(response);
        return response;
      }
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export const getDetail = async (id: string) => {
  const data = await instance.get(`/api/posts/${id}`);
  return data;
};

interface PostArgs {
  id: string;
  accessToken: string;
}
export const postLike = async ({ id, accessToken }: PostArgs) => {
  await instance
    .post(`/api/posts/${id}/like`, {}, { headers: makeHeaders(accessToken) })
    .then((response) => {
      if (response.data.success === true) {
        console.log(response);
        return response;
      }
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};
