export default interface User {
  _id: string;
  username: string;
  email: string;
  githubToken: string;
}

const emptyUser: User = {
  _id: "",
  username: "",
  email: "",
  githubToken: ""
};

export { emptyUser };
