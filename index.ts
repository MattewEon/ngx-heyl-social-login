import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SocialUser} from "./lib/social-user";
import {SocialLoginService} from "./lib/social-login.service";
import {FacebookModule} from "ngx-facebook";

export {SocialUser} from "./lib/social-user";
export {SocialLoginService} from "./lib/social-login.service";


@NgModule({
	imports: [
		FacebookModule.forRoot()
	],
	providers: [
		SocialLoginService
	],
})
export class SocialLoginModule {
}