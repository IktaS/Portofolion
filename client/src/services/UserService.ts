import HttpClient from "./http-client";
import User from "@/types/UserType";

class UserApi extends HttpClient {
  public constructor() {
    super("http://localhost:4000/api/v1/users/");
  }

  public getUser = async (id: string) => {
    try {
      return await this.instance.get<User>(`${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  public getHome = async () => {
    try {
      console.log("called");
      return (
        await this.instance.get<User>(`/dashboard`, { withCredentials: true })
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

export default new UserApi();
