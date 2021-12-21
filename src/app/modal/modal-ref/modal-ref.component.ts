import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/core/auth.service';


@Component({
  selector: 'app-modal-ref',
  templateUrl: './modal-ref.component.html',
  styleUrls: ['./modal-ref.component.sass']
})
export class ModalRefComponent implements OnInit {

  redefinedForm!: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';
  inputEmail: string = '';
  isVerification = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
    }

  createForm() {
    this.redefinedForm = this.fb.group({
      email: ['', Validators.required ]
    });
  }

  checkInput(): boolean{
    if(this.inputEmail.length == 0){
      this.errorMessage = ''
      this.successMessage = ''
    }
    return this.isVerification =
    this.inputEmail.includes('@'&&'.com')
   }


  ngOnInit(): void {
  }


  closeWindow(){
    this.router.navigate(['/login']);
  }


  async forgotPassword(email:any) {
    let result = '';
    await firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          this.successMessage = 'Verifique sua caixa de e-mail ou span'
          this.errorMessage = ''
          //alert('Verifique sua caixa de e-mail.')
          //navigator.navigate('tipoLogin')
        })
    .catch((error) => {
  //        this.errorCode = error.code;
  //         console.log(this.errorCode);
        result = error.message;
          this.errorMessage = result
          this.successMessage = ''

    });
  }


}
