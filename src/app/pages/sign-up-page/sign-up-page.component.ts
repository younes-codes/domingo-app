import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailComponent} from "../../components/sign-up/email/email.component";
import {FullNameComponent} from "../../components/sign-up/full-name/full-name.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RoleComponent} from "../../components/sign-up/role/role.component";
import {TjmComponent} from "../../components/sign-up/tjm/tjm.component";
import {ClientComponent} from "../../components/sign-up/client/client.component";
import {PasswordComponent} from "../../components/sign-up/password/password.component";
import {ButtonComponent} from "../../components/button/button.component";
import {Store} from "@ngrx/store";
import {User} from "../../models/user.model";
import {UserActions} from "../../store/user/user.actions";
import * as fromApp from '../../store/app.reducer';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-sign-up-page',
    standalone: true,
    imports: [CommonModule, EmailComponent, FullNameComponent, ReactiveFormsModule, RoleComponent, TjmComponent, ClientComponent, PasswordComponent, ButtonComponent],
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {
    signUpFormGroup: FormGroup = this.fb.group({
        fullName: [null],
        email: [null],
        password: [null],
        role: [null],
        tjm: [null],
        client: [null],
    });

    user: User;

    constructor(private fb: FormBuilder, private store: Store<fromApp.AppState>, private router: Router, private userService: UserService) {
    }

    onSubmit() {
        const client = this.signUpFormGroup.value.client.client;
        const role = this.signUpFormGroup.value.role.role;
        const email = this.signUpFormGroup.value.email.email;
        const firstname = this.signUpFormGroup.value.fullName.firstname;
        const lastname = this.signUpFormGroup.value.fullName.lastname;
        const password = this.signUpFormGroup.value.password.password;
        const tjm = this.signUpFormGroup.value.tjm.tjm;

        const user: User = {client, role, email, firstname, lastname, tjm, password};
        this.store.dispatch(new UserActions({user}));
        localStorage.setItem('user', JSON.stringify({
            client,
            role,
            tjm,
            firstname,
            lastname,
            email
        }));
        this.router.navigate(['/'])
    }
}
