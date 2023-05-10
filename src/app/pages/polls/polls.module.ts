import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from "./polls.component";
import { SharedModule } from "../../shared/shared.module";
import { PollsRoutingModule } from "./polls-routing.module";
import { OnePollComponent } from './one-poll/one-poll.component';



@NgModule({
  declarations: [
    PollsComponent,
    OnePollComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PollsRoutingModule
  ]
})
export class PollsModule { }
