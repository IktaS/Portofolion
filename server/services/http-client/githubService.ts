import Axios from "axios";
import HttpClient from "./http-client";

interface githubRepoData {
	id: number;
	name: string;
	url: string;
	description: string;
	isPublic: boolean;
	languages: string[];
}

const emptyGithubRepoData: githubRepoData = {
	id: 0,
	name: "",
	url: "",
	description: "",
	isPublic: false,
	languages: [],
};
class GithubApi extends HttpClient {
	public constructor() {
		super("");
	}

	private async prepareRepoData(repo: any, token: string) {
		let repoData: githubRepoData = {...emptyGithubRepoData};
		repoData.id = repo.id;
		repoData.name = repo.name;
		let val : any;
		try {
			let res = await this.instance.get(repo.url, {
				headers: { Authorization: "Bearer " + token }, 
			})
			val = res.data;
		} catch(err) {
			return null;
		}
		repoData.url = val.html_url;
		repoData.description = val.description;
		repoData.isPublic = !val.private;
		try {
			let res = await this.instance.get(val.languages_url, {
				headers: { Authorization: "Bearer " + token }, 
			})
			val = res.data;
		} catch(err) {
			return null;
		}
		repoData.languages = Object.keys(val);
		return repoData;
	}

	private async filterRepoData(repo: any, token: string) {
		let repoData: githubRepoData = {...emptyGithubRepoData};
		repoData.id = repo.id;
		repoData.name = repo.name;
		repoData.url = repo.html_url;
		repoData.description = repo.description;
		repoData.isPublic = !repo.private;
		let val: any;
		try {
			let res = await this.instance.get(repo.languages_url, {
				headers: { Authorization: "Bearer " + token }, 
			})
			val = res.data;
		} catch(err) {
			return null;
		}
		repoData.languages = Object.keys(val);
		return repoData;
	}

	public async exchangeToken(code: string) {
		try {
			const res = await this.instance.post(
				`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,
				{},
				{
					headers: {
						accept: "application/json",
					},
				}
			);
			const token = res.data.access_token;
			return token;
		} catch (error) {
			console.log(error);
		}
	}

	public async getRecentRepos(token: string) {
		try {
			//user data
			let user = (
				await this.instance.get(`https://api.github.com/user`, {
					headers: { Authorization: "Bearer " + token },
				})
			).data;
			//events array
			let events : any[] = (
				await this.instance.get(
					`https://api.github.com/users/${user.login}/events?per_page=50&q=type:PushEvent`,
					{
						headers: { Authorization: "Bearer " + token },
					}
				)
			).data;

			let latestPushesRepo: any[] = new Array();

			events.forEach((event: any) => {
				latestPushesRepo.push(event.repo);
			});
			

			const flags = new Set();
			const latestRepos = latestPushesRepo.filter((repo) => {
				if (flags.has(repo.id)) {
					return false;
				}
				flags.add(repo.id);
				return true;
			});

			let repoDatas: githubRepoData[] = new Array<githubRepoData>();
			for (const repo of latestRepos) {
				let repoData = await this.prepareRepoData(repo, token);
				if(!repoData) continue;
				let cloneData = Object.assign({}, repoData);
				repoDatas.push(cloneData);
			}
			return repoDatas;
		} catch (error) {
			console.log(error);
		}
	}

	public async getRepos(token: string) {
		try {
			let user = (
				await this.instance.get(`https://api.github.com/user`, {
					headers: { Authorization: "Bearer " + token },
				})
			).data;
			let repos = (
				await this.instance.get(
					`https://api.github.com/search/repositories?q=user:${user.login}`,
					{
						headers: { Authorization: "Bearer " + token },
					}
				)
			).data.items;
			let repoDatas: githubRepoData[] = new Array<githubRepoData>();
			for (const repo of repos) {
				let repoData = await this.filterRepoData(repo, token);
				if(!repoData) continue;
				let cloneData = Object.assign({}, repoData);
				repoDatas.push(cloneData);
			}
			return repoDatas;
		} catch (error) {
			console.error(error);
		}
	}
}

export default new GithubApi();
