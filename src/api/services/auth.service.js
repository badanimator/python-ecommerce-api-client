import API from "../../api/axios.config";

class AuthService {
  async login(user, password) {
    const { data } = await API.post("/auth/user/signin", {
      user,
      password,
    });
    return data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin")
    // localStorage.removeItem("expiresAt");
  }

  forgotPassword(email) {
    return API.post("/auth/forgot-password", {
      email,
    });
  }

  checkToken(token, email) {
    return API.post("auth/check-token", {
      token,
      email,
    });
  }

  resetPassword(token, email, password, password2) {
    return API.post("auth/reset-password", {
      token,
      email,
      password,
      password2,
    });
  }

  register(username, email, password) {
    return API.post("/auth/user/signup", {
      fullname,
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return API.get("/account/user");
  }
}

export default new AuthService();
