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
			let commits : any[] = (
				await this.instance.get(
					`https://api.github.com/search/commits?q=committer:${user.login}+sort:committer-date`,
					{
						headers: { 
							Authorization: "Bearer " + token ,
							accept: "application/vnd.github.cloak-preview.json"
						},
					}
				)
			).data.items;



			let latestCommitsRepo: any[] = new Array();

			commits.forEach((commit: any) => {
				latestCommitsRepo.push(commit.repository);
			});
			

			const flags = new Set();
			const latestRepos = latestCommitsRepo.filter((repo) => {
				if (flags.has(repo.id)) {
					return false;
				}
				flags.add(repo.id);
				return true;
			});

			let repoDatas: githubRepoData[] = new Array<githubRepoData>();
			for (const repo of latestRepos) {
				let repoData = await this.filterRepoData(repo, token);
				if(!repoData) continue;
				repoDatas.push({...repoData});
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
				repoDatas.push({...repoData});
			}
			return repoDatas;
		} catch (error) {
			console.error(error);
		}
	}
}

export default new GithubApi();
