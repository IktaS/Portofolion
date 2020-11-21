export default interface User {
  _id: string;
  username: string;
  email: string;
  githubKey: string;
}

const emptyUser: User = {
  _id: "",
  username: "",
  email: "",
  githubKey: ""
};

export { emptyUser };
