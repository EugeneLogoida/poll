import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "./auth.component";
import {UserAuthorizationGuard} from "../../shared/guards/auth/user-authorization.guard";

const routes: Routes = [
  {
    path: '', component: AuthComponent
    // , canDeactivate: [UserAuthorizationGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
