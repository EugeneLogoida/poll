import { Component, OnInit } from '@angular/core';
import { PollsService } from 'src/app/shared/services/polls/polls.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {

  public pollsList: Array<any> = []
  public questionList: Array<any> = []
  public maxEnteredByTimes = 0;
  public maxEnteredByPollName = '';

  public usersEnteredByPolls:Array<any> = [];
  public topEnteredByPolls:Array<any> = [];


  public maxTimesChosen = -1;
  public mostVotedAnswer:any = "";
  public questionName = "";


  public searchField!:string;





  constructor(
    private pollsService: PollsService
  ) {

  }

  ngOnInit(): void {
    this.loadPolls();
    this.loadQuestions()
  }

  loadPolls():void{
    this.pollsService.getAll().subscribe(data=>{
      this.pollsList = data
      this.showMostPopularPoll()
    }

    )
  }
  loadQuestions():void{
    this.pollsService.getAllQuestions().subscribe(data =>{
      this.questionList = data
      this.findMostVotedAnswer(this.questionList)
    })
  }

  showMostPopularPoll(){
    let arr = this.pollsList
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].enteredByTimes > this.maxEnteredByTimes) {
        this.maxEnteredByTimes = arr[i].enteredByTimes;
        this.maxEnteredByPollName = arr[i].pollName;
        this.usersEnteredByPolls = arr[i].enteredBy
      }
    }
    for (let i = 0; i < 3; i++) {
      let maxEnteredByTimes = 0;
      let maxEnteredByPollName = '';

      for (let j = 0; j < arr.length; j++) {
        if (arr[j].enteredByTimes > maxEnteredByTimes && !this.topEnteredByPolls.includes(arr[j].pollName)) {
          maxEnteredByTimes = arr[j].enteredByTimes;
          maxEnteredByPollName = arr[j].pollName;
        }
      }
      if (maxEnteredByPollName) {
        this.topEnteredByPolls.push(maxEnteredByPollName);
      }
    }
  }
  findMostVotedAnswer(arr:any) {
    for (let i = 0; i < arr.length; i++) {
      let question = arr[i];
      for (let j = 0; j < question.answers.length; j++) {
        let answer = question.answers[j];
        if (answer.timesChosen > this.maxTimesChosen) {
          this.maxTimesChosen = answer.timesChosen;
          this.mostVotedAnswer = Object.values(answer)[0];
          this.questionName = question.questionName;
        }
      }
    }
  }




}
