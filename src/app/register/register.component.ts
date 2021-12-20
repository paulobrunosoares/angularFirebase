import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  registerForm!: FormGroup
  inputEmail: string =''
  inputPassword: string = '';
  inputRepeat: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  validation = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

   checkInput(): boolean{
    return this.validation = this.inputEmail.includes('@'&&'.com')
                        && this.inputPassword.length > 5 && this.inputRepeat.length > 5
                        && this.inputPassword == this.inputRepeat
   }


   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required],
       confirmPassword: ['', Validators.required]
     });
   }


   tryRegister(value:any){
    if(this.validation){
      this.authService.doRegister(value)
       .then(res => {
//         console.log(res);
         this.errorMessage = "";
         this.successMessage = "Your account has been created";
         this.registerForm.reset();
         this.authService.doLogout();

       }, err => {
         console.log(err);
         this.errorMessage = err.message;
         this.successMessage = "";
       })
    }
   }

}
