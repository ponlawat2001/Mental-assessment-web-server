const baseUrl = "https://mental-assessment.cyclic.app";
// const baseUrl = "http://localhost:3000";

const auth = baseUrl + "/auth";
export const login = auth + "/email/login";
export const reset = auth + "/email/reset";

const news = baseUrl + "/news";
export const newsfindAll = news + "/findAll";
export const newsupdate = news + "/update";
export const newscreate = news + "/create";
export const newsdelete = news + "/delete";

const storage = baseUrl + "/storage";
export const storageImageupload = storage + "/uploadImage";
