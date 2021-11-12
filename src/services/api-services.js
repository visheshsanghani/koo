import Axios from "axios";
import sessionExpired from "../Core/sessionExpired";

const apiBase = "http://localhost:5000/";
const accesToken = JSON.parse(localStorage.getItem("authUser"));

const api = function () {
  this.apiBase = apiBase;
  this.accesToken = accesToken ? accesToken.ACCESS_TOKEN : "";
  this.axios = Axios.create({
    timeout: 10000,
  });
  this.axios.defaults.headers.post["Content-Type"] = "application/json";
  this.axios.interceptors.request.use(
    (req) => {
      req["headers"]["Authorization"] = this.accesToken
        ? `Bearer ${this.accesToken}`
        : "";
      return req;
    },
    (e) => {
      return Promise.reject(e);
    },
  );
  this.axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (e) => {
      if (e.response && e.response.status === 401) {
        sessionExpired();
      }
      return Promise.reject(e);
    },
  );
};

api.prototype.getApiBase = function () {
  return this.apiBase;
};

api.prototype.get = function (url, params = {}) {
  return this.axios({
    method: "get",
    url,
    params,
  });
};

api.prototype.post = function (url, data = {}, params = {}) {
  return this.axios({
    method: "post",
    url,
    data,
    params,
  });
};

api.prototype.put = function (url, data, params = {}) {
  return this.axios({
    method: "put",
    url,
    data,
    params,
  });
};

api.prototype.delete = function (url, data) {
  return this.axios({
    method: "delete",
    url,
    data,
  });
};

const API = new api();

export { API };
