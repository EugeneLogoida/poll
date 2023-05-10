import { Component, OnInit } from '@angular/core';
import {PollsService} from "../../shared/services/polls/polls.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  public pollsList: Array<any> = [];
  public sortByParam = '';
  public searchField!:string;


  public currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  public date = new Date().toJSON();


  constructor(
    private pollsService: PollsService
  ) { }

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls():void{
    this.pollsService.getAll().subscribe(data=>{
      this.pollsList = data
    }
    )
  }
  enteredByCheck(poll:any){
    console.log(poll);
    console.log();

  }





}
