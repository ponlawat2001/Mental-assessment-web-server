const baseUrl = "https://mental-assessment.cyclic.app";
// const baseUrl = "http://localhost:3000";

const auth = baseUrl + "/auth";
export const login = auth + "/email/login";
export const reset = auth + "/email/reset";

const user = baseUrl + "/users";
export const usersCreate = user + "/create";

const admin = baseUrl + "/admin";
export const adminfindEmail = admin + "/findEmail";
export const adminfindAll = admin + "/findAll";
export const admindelete = admin + "/delete";
export const admincreate = admin + "/create";

const assessment = baseUrl + "/assessment";
export const assessmentfindAll = assessment + "/findAll";
export const assessmentcreate = assessment + "/create";
export const assessmentdelete = assessment + "/delete";
export const assessmentupdate = assessment + "/update";

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
export const avatarfavorite = avatar + "/favorite";

const users = baseUrl + "/users";
export const usersfindAll = users + "/findAll";

const history = baseUrl + "/history";
export const historyfindAll = history + "/findAll";

const vent = baseUrl + "/vent";
export const ventfindAll = vent + "/findAll";

const audio = baseUrl + "/audio";
export const audiofindAdmin = audio + "/findAdmin";

const storage = baseUrl + "/storage";
export const storageImageupload = storage + "/uploadImage";
