import { redirect } from "react-router-dom";

export const getExpDuration = () => {
  const expDate = localStorage.getItem("exp");
  const expDateInMilli = new Date(expDate);
  const currentDateInMilli = new Date();
  const duration = expDateInMilli - currentDateInMilli;

  return duration;
};

export const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const duration = getExpDuration();
  if (duration < 0) {
    return "TOKEN EXPIRE";
  }
  return token;
};

export const tokenLoader = () => {
  return getToken();
};

export const checkTokenLoader = () => {
  const token = getToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }
  return token;
};
