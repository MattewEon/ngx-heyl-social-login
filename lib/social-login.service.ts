import {Injectable} from "@angular/core";
import {FacebookService, InitParams, LoginResponse} from "ngx-facebook";
import {SocialUser} from "./social-user";
declare const gapi: any;

@Injectable()
export class SocialLoginService {
	constructor(private fb: FacebookService) {
	}

	initFacebookProvider(appId: string, version: string) {
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = "https://connect.facebook.net/en_US/sdk.js";

		script.onload = () => {
			let initParams: InitParams = {
				appId: appId,
				version: version
			};

			this.fb.init(initParams);

		};

		document.getElementsByTagName('head')[0].appendChild(script);
	}

	initGoogleProvider(googleAppKey: string) {
		let meta = document.createElement('meta');
		meta.name = "google-signin-client_id";
		meta.content = googleAppKey + ".apps.googleusercontent.com";
		document.getElementsByTagName('head')[0].appendChild(meta);

		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = "https://apis.google.com/js/platform.js";
		script.onload = () => {
			gapi.load('auth2', function () {
				gapi.auth2.init()
			});
		};
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	facebookLogin(callback: (SocialUser) => any) {
		this.fb.login().then((response: LoginResponse) => {
			if (response.status == "connected") {
				let user: SocialUser = new SocialUser()
					.setId(response.authResponse.userID)
					.setToken(response.authResponse.accessToken)
					.setPictureUrl("https://graph.facebook.com/" + response.authResponse.userID + "/picture?type=large");
				user.provider = "facebook";

				this.fb.api("/me?fields=name,email").then(data => {
					user.setEmail(data.email)
						.setName(data.name);
					this.fb.logout();
					callback(user);
				});
			}
		}).catch((error: any) => {
			throw new Error(error);
		});
	}

	googleLogin(callback: (SocialUser) => any) {
		let googleAuth = gapi.auth2.getAuthInstance();
		googleAuth.then(() => {
			let user: SocialUser = new SocialUser();
			user.provider = "google";
			googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
				let profile = googleUser.getBasicProfile();
				user.setToken(googleUser.getAuthResponse().access_token)
					.setId(profile.getId())
					.setName(profile.getName())
					.setEmail(profile.getEmail())
					.setPictureUrl(profile.getImageUrl());
				googleAuth.disconnect();
				callback(user);
			});
		});
	}
}