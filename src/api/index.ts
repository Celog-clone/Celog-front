import axios from "axios";
import { NewUser, User } from "types";

const makeHeaders = (accessToken: string) => {
  return { Authorization: `Bearer  ${accessToken}` };
};

export const signup = async (newUser: NewUser) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/members/signup`,
      newUser
    );
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};

export const signin = async (user: User) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/members/login`,
      user
    );
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};

export const getMyPosts = async (nickname: string, accessToken: string) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/mypage?nickname=${nickname}`,
      { headers: makeHeaders(accessToken) }
    );
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return alert(`Error : ${err.message}`);
    }
  }
};
