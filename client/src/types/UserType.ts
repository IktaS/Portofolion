import Repo, { emptyRepo } from "./RepoType";

export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  description: string;
  username: string;
  email: string;
  profilePicture: unknown;
  repos: Repo[];
}

const emptyUser: User = {
  _id: "",
  firstName: "",
  lastName: "",
  description: "",
  username: "",
  email: "",
  profilePicture: null,
  repos: [emptyRepo]
};

export { emptyUser };
