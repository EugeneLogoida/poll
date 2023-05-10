import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PollsService} from "../../shared/services/polls/polls.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-admin-polls',
  templateUrl: './admin-polls.component.html',
  styleUrls: ['./admin-polls.component.scss']

})
export class AdminPollsComponent implements OnInit {

  public questionForm!: FormGroup;
  public pollInfoForm!: FormGroup;

  public isPollPublic = true;



  public x: any = [];

  public pollsList: Array<any> = []

  public arrayOfAnswers: Object = [];
  public arrayOfQuestions: Object = [];
  public arrayOfPolls: Object = [];


  public listOfEmails: Array<String> = [];

  public email!:string;
  public selectedDate = '';






  constructor(
    private fb: FormBuilder,
    private pollsService: PollsService
  ){}
  ngOnInit(): void {
    this.initQuestionForm();
    this.loadPolls();
    this.initPollInfoForm();


  }



  changePublic(isPublic:boolean):void{
    this.isPollPublic = isPublic;
  }

  initQuestionForm(){
    this.questionForm = this.fb.group({
      questionName: [null, Validators.required],
      q1:[null, Validators.required],
      q2:[null, Validators.required],
      q3:[null, Validators.required],
      q4:[null, Validators.required]

    })
  }
  initPollInfoForm(){
    this.pollInfoForm = this.fb.group({
      pollName: [null, Validators.required],
      pollDescription: [null, Validators.required],

    })
  }

  loadPolls():void{
    this.pollsService.getAll().subscribe(data=>
       this.pollsList = data
    )
  }


  addEmail():void{
    this.listOfEmails.push(this.email);
    this.email = ''
  }


  deleteEmail(cEmail:String):void{
    this.listOfEmails.splice(this.listOfEmails.indexOf(cEmail), 1);
  }


  gener(){
    let accToVal = this.questionForm.value;
    this.arrayOfAnswers =
      [
        {
          "answerName1": accToVal.q1,
          "timesChosen": 0
        },
        {
          "answerName2": accToVal.q2,
          "timesChosen": 0
        },
        {
          "answerName3": accToVal.q3,
          "timesChosen": 0
        },
        {
          "answerName4": accToVal.q4,
          "timesChosen": 0
        }

      ]

    let currentPollId = this.pollsList[this.pollsList.length-1].id
    this.arrayOfQuestions = {
      questionName: accToVal.questionName,
      pollId: currentPollId,
      answers:  this.arrayOfAnswers
    }
    this.pollsService.createQuestion(this.arrayOfQuestions).subscribe(() =>
      this.loadPolls()
    )
    this.questionForm.reset();
  }

  createPoll(){
    this.arrayOfPolls = {
      "pollName": this.pollInfoForm.value.pollName,
      "pollDescription": this.pollInfoForm.value.pollDescription,
      "expiredAt": this.selectedDate,
      "public": this.isPollPublic,
      "availableTo": this.listOfEmails,
      "enteredBy": [],
      "enteredByTimes": 0

    }
    console.log(this.arrayOfPolls);
    this.pollInfoForm.reset();
    this.questionForm.reset();
    this.pollsService.create(this.arrayOfPolls).subscribe(() =>
      this.loadPolls()
    )
  }
  res(){
  }
  add(){
    this.gener();
  }


  dateChanged($event: any){
    this.selectedDate = $event.target.value;
  }



}
