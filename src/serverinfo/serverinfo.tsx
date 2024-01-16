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

const contact = baseUrl + "/contact";
export const contactfindAll = contact + "/findAll";
export const contactupdate = contact + "/update";

const avatar = baseUrl + "/avatars";
export const avatarfindAll = avatar + "/findAll";

const users = baseUrl + "/users";
export const usersfindAll = users + "/findAll";

const storage = baseUrl + "/storage";
export const storageImageupload = storage + "/uploadImage";
