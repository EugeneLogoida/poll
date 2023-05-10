import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { AdminPollsComponent } from "./admin-polls/admin-polls.component";
import { AdminStatsComponent } from "./admin-stats/admin-stats.component";
import {AdminChangePollsComponent} from "./admin-change-polls/admin-change-polls.component";
import {ChangeOneComponent} from "./admin-change-polls/change-one/change-one.component";
import {AdminAuthGuard} from "../shared/guards/auth/admin-auth.guard";


const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AdminAuthGuard], children: [
      { path: 'polls', component: AdminPollsComponent },
      { path: 'stats', component: AdminStatsComponent },
      { path: 'change-polls', component: AdminChangePollsComponent },
      { path: 'change-polls/:id', component: ChangeOneComponent },
      { path: '', pathMatch: 'full', redirectTo: 'polls' }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
