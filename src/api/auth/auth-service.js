import { _get, _post } from "@/api/abstract-api-service";

const getAuthorizationUrl = async () =>{
  const requestToken = await _get("/user/login", {});
  localStorage.setItem("oauth_token", requestToken.oauth_token);
  localStorage.setItem("oauth_tokenSecret", requestToken.oauth_tokenSecret);
  return requestToken.authorizationUrl;
}

const getAccessToken = async (request) =>{
  request.oauth_token = localStorage.getItem("oauth_token");
  request.oauth_tokenSecret = localStorage.getItem("oauth_tokenSecret");
  const token = await _post("/user/sign", {}, request);
  localStorage.clear();
  localStorage.setItem("token", token);
}

export{
  getAuthorizationUrl,
  getAccessToken
}