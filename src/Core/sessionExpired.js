import swal from "sweetalert";
import { API } from "../services/api-services";

const sessionExpired = (forceReload = false) => {
  swal({
    title: "Session Expired",
    text: "Continue working?",
    icon: "warning",
    buttons: ["No, go to home page.", "Yes, Login"],
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((login) => {
    if (login) {
      const user = JSON.parse(localStorage.getItem("authUser"));
      const username = user.UserId;
      swal({
        title: "Login",
        text: username + ", Enter your password.",
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your password",
            type: "password",
          },
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
      })
        .then((password) => {
          return API.post("/login", { UserId: username, Password: password });
        })
        .then((res) => {
          if (res) {
            localStorage.setItem("authUser", JSON.stringify(res.data));
            window.location.reload();
          }
        })
        .catch((e) => {
          if (e.response?.data?.msg === "Wrong Password") {
            localStorage.removeItem("authUser");
            window.location.replace("/");
          }
        });
    } else {
      localStorage.removeItem("authUser");
      window.location.replace("/");
    }
  });
};

export default sessionExpired;
