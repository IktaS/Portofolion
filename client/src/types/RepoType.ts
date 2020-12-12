export default interface Repo {
  id: string;
  name: string;
  url: string;
  description: string;
}

const emptyRepo: Repo = {
  id: "",
  name: "",
  url: "",
  description: ""
};

export { emptyRepo };
