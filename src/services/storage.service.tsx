import axios from "axios";
import { storageImageupload } from "../serverinfo/serverinfo";

export default class StorageService {
  static async uploadImage(imageFile: File) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("image", imageFile, imageFile.name ?? "Untitle");
    try {
      const res = await axios.post(storageImageupload, formData, { headers });
      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
    }
  }
}
