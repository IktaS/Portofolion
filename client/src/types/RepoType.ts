export default interface Repo {
  id: string;
  name: string;
  url: string;
  description: string;
  isPublic: boolean;
}

const emptyRepo: Repo = {
  id: "",
  name: "",
  url: "",
  description: "",
  isPublic: false
};

export { emptyRepo };
