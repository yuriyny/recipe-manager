import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode: boolean = true;
    isLoading = false;
    error: string = null;
    constructor(private authService: AuthService) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmitForm(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.login(email,password);
        } else {
            authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(respData => {
            this.isLoading = false;
            console.log(respData);

        },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;


            });
        form.reset();
        //console.log(form.value);

    }
}