# ngx-heyl-snackbar

This package allows you to login with Google and/or Facebook api in AngularX (2+)

## Installation

1. Install npm module : 

   `npm install ngx-heyl-social-login`
   
2. Import the module :

    Open your `app.module.ts` file and import the module like this :
    
    ```typescript
    import { SocialLoginModule } from "ngx-heyl-social-login";  
    @NgModule({
       imports: [ 
           ...,
           SocialLoginModule
       ]
    })
    ```
 
3. Initialize Google and/or Facebook api in `app.component.ts` :

   Open your `app.component.ts` and initialize Google and/or Facebook api :
   ```typescript
   constructor(private socialLoginService: SocialLoginService) {
       // FacebookAppID : 15 digit number
       this.socialLoginService.initFacebookProvider("FacebookAppID", "v2.9");
       // GoogleAppId : numbers-numbersAndLetters
       this.socialLoginService.initGoogleProvider("GoogleAppId");
   }
   ```
   
   ######! Note : Call these functions will add to your `<head>` HTML element you'll need to have. Don't put by yourself Google and Facebook sdk's, or Google's `<meta>` element 

   Now yo can use the googleLogin and facebookLogin in your other components :
   
   ```typescript
    facebookLogin() {
        this.socialLoginService.facebookLogin(socialUser => {
            console.log(socialUser);
        });
    }
    
    googleLogin() {
        this.socialLoginService.googleLogin(socialUser => {
            console.log(socialUser);
        });
    }
    ```