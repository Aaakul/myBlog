import axios from "axios";

const getPosts = async (search) => {
  try {
    let res = [];
    const field = search ? search.split("?")[1].split("=")[0] : "";
    const keyword = search ? search.split("=")[1].split("&")[0] : "";
    const dateAsc = !search?.includes("order=oldest") ? false : true; // Order by date des by default
    res = await axios.get("/posts/", {
      params: {
        field: field,
        keyword: keyword,
        order: dateAsc ? "oldest" : "",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export default getPosts;
