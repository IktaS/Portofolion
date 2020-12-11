export default interface Repo {
	name: string;
	url: string;
	description: string;
}

const emptyRepo: Repo = {
	name: "",
	url: "",
	description: "",
};

export { emptyRepo };
