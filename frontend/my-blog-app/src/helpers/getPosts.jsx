import axios from "axios";

const getPosts = async (search) => {
  try {
    let res = [];
    const field = search ? search.split("?")[1].split("=")[0] : "";
    const keyword = search ? search.split("=")[1] : "";
    res = await axios.get(`/posts/?field=${field}&keyword=${keyword}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export default getPosts;
