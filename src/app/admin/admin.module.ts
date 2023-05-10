import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AdminStatsComponent } from "./admin-stats/admin-stats.component";
import { AdminPollsComponent } from "./admin-polls/admin-polls.component";
import { SharedModule } from "../shared/shared.module";
import { AdminChangePollsComponent } from './admin-change-polls/admin-change-polls.component';
import { ChangeOneComponent } from './admin-change-polls/change-one/change-one.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminStatsComponent,
    AdminPollsComponent,
    AdminChangePollsComponent,
    ChangeOneComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
