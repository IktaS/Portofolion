import HttpClient from "./http-client";

class AuthApi extends HttpClient {
	public constructor() {
		super(`${process.env.VUE_APP_API_URL}/v1/auth/`);
	}

	public login = async (username: string, password: string) => {
		try {
			return (
				await this.instance.post(
					"/login",
					{ username, password },
					{ withCredentials: true }
				)
			).data;
		} catch (error) {
			console.error(error);
		}
	};

	public register = async (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => {
		try {
			return (
				await this.instance.post(`/register`, {
					firstName,
					lastName,
					username,
					email,
					password,
				})
			).data;
		} catch (error) {
			console.error(error);
		}
	};

	public logout = async () => {
		try {
			await this.instance.get("/logout", { withCredentials: true });
		} catch (error) {
			console.error(error);
		}
	};
}

export default new AuthApi();
