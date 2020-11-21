import HttpClient from "./http-client";

class AuthApi extends HttpClient {
  public constructor() {
    super("http://localhost:4000/api/v1/users/");
  }

  public login = async (username: string, password: string) => {
    try {
      return (await this.instance.post("/login", { username, password })).data;
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

  public check = async (value: string) => {
    try {
      return (await this.instance.get(`/check/${value}`)).data;
    } catch (error) {
      console.error(error);
    }
  };
}

export default new AuthApi();
