import axios from "axios";

const loginUrl = "https://hazmanot-api.onrender.com/auth/login";
const registerUrl = "https://hazmanot-api.onrender.com/auth/register";
const userUrl = "https://hazmanot-api.onrender.com/user/";
const verifyUrl = "https://hazmanot-api.onrender.com/auth/authorized";
const reMassageUrl = "https://hazmanot-api.onrender.com/auth/newToken";
const problemUrl = "https://hazmanot-api.onrender.com/user/problem";

export const userLogin = (FrmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, FrmData);
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userRegister = (FrmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(registerUrl, FrmData);
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        reject("Token not found!");
      }
      const root = localStorage.getItem("userID");

      const res = await axios.get(userUrl + root, {
        headers: {
          token: accessToken,
        },
      });
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const userVerify = (FrmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(verifyUrl, FrmData);
      if (res.status === 200) {
        resolve(res.data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const sendMassageAgain = (FrmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(reMassageUrl, FrmData);
      if (res.status === 200) {
        resolve(res.data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const userProblem = (FrmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(problemUrl, FrmData);
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};
