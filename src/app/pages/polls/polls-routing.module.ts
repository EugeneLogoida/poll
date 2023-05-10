import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PollsComponent} from "./polls.component";
import {OnePollComponent} from "./one-poll/one-poll.component";

const routes: Routes = [
  {
    path: '', component: PollsComponent
  },
  {
    path: ':id', component: OnePollComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PollsRoutingModule { }
