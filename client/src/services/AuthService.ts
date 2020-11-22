import HttpClient from "./http-client";

class AuthApi extends HttpClient {
  public constructor() {
    super("http://localhost:4000/api/v1/auth/");
  }

  public login = async (username: string, password: string) => {
    try {
      return (
        await this.instance.post(
          "/login",
          { username, password },
          { withCredentials: true }
        )
      ).data;
    } catch (error) {
      console.error(error);
    }
  };

  public register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      return (
        await this.instance.post(`/register`, {
          username,
          email,
          password
        })
      ).data;
    } catch (error) {
      console.error(error);
    }
  };

  public logout = async () => {
    try {
      await this.instance.get("/logout", { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  };
}

export default new AuthApi();
