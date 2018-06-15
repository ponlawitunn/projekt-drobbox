import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService) { }
  //
    ngOnInit() {
      this.activatedRoute.url.subscribe(() => {
        const currentUrl = this.router.url;
        if(currentUrl.indexOf('&') !== -1){
          const params = currentUrl.split('&');
          const authTokenParams = params[0].split('='); // Consts work with URL
          const authToken = authTokenParams[1];
          localStorage.setItem('token', authToken);
          if(localStorage.getItem('token') === 'The+user+chose+not+to+give+your+app+access+to+their+Dropbox+account.'){
            localStorage.removeItem('token');
            // If users chooses "cancel". User will be unable to access, this will thus be the new token
          }
          this.router.navigate(['']);
        } else{
          this.router.navigate(['login']);
        }
        // Navigates user correctly
  });
}

login(){
 this.loginService.login();
}
}