export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  description: string;
  username: string;
  email: string;
  profilePicture: unknown;
  githubToken: string;
}

const emptyUser: User = {
  _id: "",
  firstName: "",
  lastName: "",
  description: "",
  username: "",
  email: "",
  profilePicture: null,
  githubToken: ""
};

export { emptyUser };
