import { Component, OnInit } from '@angular/core';
import {ROLE} from "../../shared/constants/roles.constants";
import {AccountService} from "../../shared/services/account/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLogin = false;
  public loginUrl = '';
  public loginPage = ''
  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkUserLogin();
    this.checkUpdatesUserLogin()
  }

  checkUserLogin():void{
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser && currentUser.role === ROLE.ADMIN){
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Адмін-панель';
    } else if (currentUser && currentUser.role == ROLE.USER){
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Кабінет';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }
  checkUpdatesUserLogin():void{
    this.accountService.isUserLoginSubject.subscribe(()=>{
      this.checkUserLogin()
    })
  }
  logout():void{

    this.router.navigate(['/auth']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLoginSubject.next(true);

  }

  ne(){
    console.log(this.isLogin);

    this.accountService.isUserLoginSubject.next(true);


  }


}
