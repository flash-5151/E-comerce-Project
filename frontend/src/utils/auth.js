import React from "react";

export const saveToken = (token) => {
  localStorage.setItem("access_token", token.access);
  localStorage.setItem("refresh_token", token.refresh);
  console.log(localStorage.getItem("access_token"));
};
export const clearToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  return;
};
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
export const authFetch = (url, options = {}) => {
  const token = getAccessToken();
  const headers = options.headers ? { ...options.headers } : {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  headers["Content-Type"] = "application/json";
  return fetch(url, { ...options, headers });
};
