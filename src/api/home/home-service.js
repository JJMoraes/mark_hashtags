import {_get, _post, _del} from "@/api/abstract-api-service";

const getTweetsAPI = async (id) => {
  return await _get(`/hashtag/${id}/tweets`,{});
}

const getUser = async (id) =>{
  return await _get(`/user/${id}`, {});
}

const getHashtags = async (id) =>{
  return await _get(`/hashtag/owner/${id}`, {});
}

const saveHashtag = async (hashtag) =>{
  return await _post("/hashtag", {}, hashtag)
}

const deleteHashtag = async (id) =>{
  return await _del(`/hashtag/${id}`, {});
}

export {
  getTweetsAPI,
  getUser,
  getHashtags,
  saveHashtag,
  deleteHashtag
}
