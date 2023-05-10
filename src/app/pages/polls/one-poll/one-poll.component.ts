import { Component, OnInit } from '@angular/core';
import {PollsService} from "../../../shared/services/polls/polls.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-one-poll',
  templateUrl: './one-poll.component.html',
  styleUrls: ['./one-poll.component.scss']
})
export class OnePollComponent implements OnInit {
  public poll!: any;

  public allQuestions!:any;
  public answerID!: number;

  public currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

  public POLL_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  constructor(
    private pollsService: PollsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPoll();
  }

  getPoll() {

    this.pollsService.getOne(this.POLL_ID).subscribe(data => {
      this.poll = data;
      this.allQuestions = this.poll.questions;

    })
  }
  saveAnswer(x:any){
    x.answers[this.answerID].timesChosen++;
    this.pollsService.updateQuestion(x, x.id).subscribe(() => {
    })

  }
  savePoll(poll:any){
    console.log(poll)
    console.log(poll.questions)
    if(!(poll.enteredBy.includes(this.currentUser.email))) {
      poll.enteredBy.push(this.currentUser.email);
      poll.enteredByTimes = poll.enteredBy.length
    }
    delete poll.questions;
    this.pollsService.update(poll, poll.id).subscribe(

    )
    this.router.navigate(['/polls'])

  }




}
