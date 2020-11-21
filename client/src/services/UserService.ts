import HttpClient from "./http-client";
import User from "@/types/UserType";

class TodoApi extends HttpClient {
  public constructor() {
    super("http://localhost:4000/api/v1/users/");
  }

  public getUser = async (id: string) => {
    try {
      return await this.instance.get<User>(`/user/${id}`);
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
}

export default new TodoApi();
