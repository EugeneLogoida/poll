import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {ROLE} from "../../shared/constants/roles.constants";

import { Router } from '@angular/router';
import {IRegister} from "../../shared/interfaces/authorization/authorization.interface";
import {AccountService} from "../../shared/services/account/account.service";
import { log } from 'console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {


  // admin@gmail.com     admin123




  public isRegister = true;
  public registerForm!: FormGroup;
  public loginForm!: FormGroup;
  public registerData!: IRegister


  public loginSubscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private router: Router,

    private accountService: AccountService,

  ) { }

  ngOnInit(): void {
    this.initRegisterForm();
    this.initLoginForm();
  }
  ngOnDestroy(): void {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe()
    }
  }

  initRegisterForm():void{
    this.registerForm = this.fb.group({
      fName: [],
      lName: [],
      email: [],
      password: [],
    })
  }
  initLoginForm():void{
    this.loginForm = this.fb.group({
      email: [],
      password: []
    })
  }



  loginUser(): void {
    const { email, password } = this.loginForm.value;
    this.login(email, password).then(() => {
      console.log('User successfully login');
      console.log(email, password);
    }).catch(e => {
      console.log(e.message);
    })
  }
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    console.log(credential);

    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      let currentUser = { ...user, uid: credential.user.uid };
      console.log(currentUser);

      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if(user && user['role'] === ROLE.USER) {
        this.router.navigate(['/home']);
        this.accountService.isUserLoginSubject.next(true);
      }
      if(user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin/polls']);
        this.accountService.isUserLoginSubject.next(true);
      }
      console.log('user', user);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const { email, password } = this.registerForm.value;
    this.registerData = this.registerForm.value;
    this.emailSignUp(email, password).then(() => {
      console.log('User successfully created');
      this.changeIsLogin();
      this.registerForm.reset();
    }).catch(e => {
      console.log(e.message);
    })
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: this.registerData.fName,
      lastName: this.registerData.lName,
      availablePolls: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  changeIsLogin():void{
    this.isRegister = !this.isRegister
  }
}
