import  type{ UsersInterface } from "../../interfaces/IUser";
import type{ SignInInterface } from "../../interfaces/SignIn";
import axios from "axios";
// const apiUrl = "http://localhost:8000";
const apiUrl = "https://sa-02-l25w-g6klc00jd-mags-projects-86fbc19c.vercel.app";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

async function SignIn(data: SignInInterface) {
  return await axios
    .post(`${apiUrl}/signin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetGender() {
  return await axios
    .get(`${apiUrl}/genders`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsers() {
  return await axios
    .get(`${apiUrl}/users`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsersThisHour() {
  return await axios
    .get(`${apiUrl}/users/this-hour`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetCountUser() {
  return await axios
    .get(`${apiUrl}/users/count`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsersById(id: string) {
  return await axios
    .get(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateUsersById(id: string, data: UsersInterface) {
  return await axios
    .put(`${apiUrl}/user/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteUsersById(id: string) {
  return await axios
    .delete(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateUser(data: UsersInterface) {
  return await axios
    .post(`${apiUrl}/signup`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  SignIn,
  GetGender,
  GetUsers,
  GetUsersThisHour,
  GetUsersById,
  UpdateUsersById,
  DeleteUsersById,
  CreateUser,
  GetCountUser,
};
