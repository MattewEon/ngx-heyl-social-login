export class SocialUser {
	public id: string;
	public token: string;

	public name: string;
	public email: string;
	public pictureUrl: string;

	public provider: "google" | "facebook";

	public setId(id: string): SocialUser {
		this.id = id;
		return this;
	}
	public setToken(token: string): SocialUser {
		this.token = token;
		return this;
	}
	public setName(name: string): SocialUser {
		this.name = name;
		return this;
	}
	public setEmail(email: string): SocialUser {
		this.email = email;
		return this;
	}
	public setPictureUrl(pictureUrl: string): SocialUser {
		this.pictureUrl = pictureUrl;
		return this;
	}

}