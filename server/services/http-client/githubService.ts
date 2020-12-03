import Axios from "axios";
import HttpClient from "./http-client";

class GithubApi extends HttpClient {
	public constructor() {
		super("");
	}

	public exchangeToken = async (code: string) => {
		try {
			const res = await this.instance.post(
                `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,
                {},
                { headers: 
                    { 
                        accept: "application/json" 
                    } 
                }
            );
            const token = res.data.access_token;
			return token;
		} catch (error) {
			console.log(error);
		}
	};

	public getRepos = async (token: string) => {
		try {
			//user data
			let user = (
				await this.instance.get(`https://api.github.com/user`, {
					headers: { Authorization: "Bearer " + token },
				})
			).data;
			//events array
			let events = (
				await this.instance.get(`https://api.github.com/users/${user.login}/events`, {
					headers: { Authorization: "Bearer " + token },
				})
			).data;

			events.filter((event: any) => {
				return event.type == "PushEvent";
			});

			let latestPushesRepo: any[] = [];

			events.forEach((event: any) => {
				latestPushesRepo.push(event.repo);
			});

			const flags = new Set();
			const latestRepos = latestPushesRepo.filter(repo  => {
				if(flags.has(repo.name)){
					return false;
				}
				flags.add(repo.name);
				return true;
			})
			return latestRepos;
		} catch (error) {
			console.log(error);
		}
	};
}

export default new GithubApi();
