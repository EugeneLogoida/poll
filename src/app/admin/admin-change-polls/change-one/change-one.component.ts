import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PollsService} from "../../../shared/services/polls/polls.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-one',
  templateUrl: './change-one.component.html',
  styleUrls: ['./change-one.component.scss']
})
export class ChangeOneComponent implements OnInit {


  public poll!: any;

  public allQuestions!:any;
  public editStatus = false;
  public questionForm!: FormGroup;
  public questionId = 0;
  public tCh1 = 0;
  public tCh2 = 0;
  public tCh3 = 0;
  public tCh4 = 0;

  public arrayOfAnswers: Object = [];
  public arrayOfQuestions: Object = [];

  public POLL_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  constructor(
    private pollsService: PollsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.getPoll();
    this.initQuestionForm();
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

  getPoll(){

    this.pollsService.getOne(this.POLL_ID).subscribe(data => {
      console.log(data);
      this.poll = data;
      this.allQuestions = this.poll.questions;

    })





  }
  editQuestion(question:any){
    console.log(question)
    this.questionForm.patchValue({
      questionName: question.questionName,
      q1: question.answers[0].answerName1,
      q2:question.answers[1].answerName2,
      q3:question.answers[2].answerName3,
      q4:question.answers[3].answerName4
    })
    this.editStatus = true;
    this.questionId = question.id
    this.tCh1 = question.answers[0].timesChosen
    this.tCh2 =question.answers[1].timesChosen
    this.tCh3 =question.answers[2].timesChosen
    this.tCh4 =question.answers[3].timesChosen
    this.scrollToElement();
  }
  save(){
    let accToVal = this.questionForm.value;
    this.arrayOfAnswers =
      [
        {
          "answerName1": accToVal.q1,
          "timesChosen": this.tCh1
        },
        {
          "answerName2": accToVal.q2,
          "timesChosen": this.tCh2
        },
        {
          "answerName3": accToVal.q3,
          "timesChosen": this.tCh3
        },
        {
          "answerName4": accToVal.q4,
          "timesChosen": this.tCh4
        }

      ]

    this.arrayOfQuestions = {
      questionName: accToVal.questionName,
      answers:  this.arrayOfAnswers
    }
    this.pollsService.updateQuestion(this.arrayOfQuestions, this.questionId).subscribe((data) => {

      this.getPoll();
    })
    this.editStatus = false;
  }
  deleteQuestion(question:any){
    this.pollsService.deleteQuestion(question.id).subscribe(() => {
      this.getPoll();
    })
  }

  scrollToElement(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }



}
