import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../shared/services/account/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  public cUser = JSON.parse(localStorage.getItem('currentUser') as string);
  public editProfileForm!:FormGroup
  public changeProfileStatus = false;
  private currentProfileId!: number | string;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initEditProfileForm()
  }
  initEditProfileForm(){
    this.editProfileForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    })
  }


  changeProfile(){
    this.changeProfileStatus = true;
  }
  saveChanges(){
    this.accountService.updateUser(this.editProfileForm.value,
      this.cUser.uid as string).then(() => {
        localStorage.clear();
        this.router.navigate(['/auth']);
      this.changeProfileStatus = false;
    })
  }
  deleteProfile(){
    this.accountService.deleteUser(
      this.cUser.uid as string).then(() => {
      localStorage.clear();
      this.router.navigate(['/auth']);
      this.changeProfileStatus = false;
    })
  }


}
