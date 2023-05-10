import { Component, OnInit } from '@angular/core';
import {PollsService} from "../../shared/services/polls/polls.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-change-polls',
  templateUrl: './admin-change-polls.component.html',
  styleUrls: ['./admin-change-polls.component.scss']
})
export class AdminChangePollsComponent implements OnInit {

  public pollsList: Array<any> = []

  public pollInfoForm!: FormGroup;
  public pollId = 0;
  public editStatus= false;

  public currentPoll!:any
  constructor(
    private pollsService: PollsService,

    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.initPollInfoForm()
    this.loadPolls();
  }

  loadPolls():void{
    this.pollsService.getAll().subscribe(data=>
      this.pollsList = data
    )
  }
  initPollInfoForm(){
    this.pollInfoForm = this.fb.group({
      pollName: [null, Validators.required],
      pollDescription: [null, Validators.required],

    })
  }
  editPoll(poll: any):void{
    this.editStatus = true;
    this.pollInfoForm.patchValue({
      pollName: poll.pollName,
      pollDescription: poll.pollDescription
    })
    this.currentPoll = poll;
    this.pollId = poll.id
  }
  save(){
    this.currentPoll.pollName = this.pollInfoForm.value.pollName
    this.currentPoll.pollDescription = this.pollInfoForm.value.pollDescription
    this.pollsService.update(this.currentPoll, this.currentPoll.id).subscribe(()=>{
      this.loadPolls()
    })
    this.editStatus = false;
  }

  deletePoll(poll: any):void{
    this.pollsService.delete(poll.id).subscribe(() => {
      this.loadPolls();
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
