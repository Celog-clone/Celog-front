import axios from "axios";
import { User } from "types";

export const signup = async (newUser: User) => {
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
