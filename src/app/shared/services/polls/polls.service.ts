import { Injectable } from '@angular/core';
import {
  Firestore,
  CollectionReference,
  DocumentData,
  collection,
  collectionData,
  doc,
  docData, addDoc, updateDoc, deleteDoc
} from "@angular/fire/firestore";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPollRequest, IPollResponse} from "../../interfaces/polls/polls.interface";

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  private url = environment.BACKEND_URL;
  private api = { polls: `${this.url}/polls`, questions: `${this.url}/questions`};

  constructor(
    private http: HttpClient
  ) {}
  getAll(): Observable<IPollResponse[]> {
    return this.http.get<IPollResponse[]>(`${this.api.polls}?_embed=questions`);
  }
  getOne(id: number): Observable<IPollResponse> {
    return this.http.get<IPollResponse>(`${this.api.polls}/${id}?_embed=questions`);
  }

  create(poll: any): Observable<IPollResponse> {
    return this.http.post<IPollResponse>(this.api.polls, poll);
  }
  update(poll: IPollRequest, id: number): Observable<IPollResponse> {
    return this.http.patch<IPollResponse>(`${this.api.polls}/${id}`, poll);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.polls}/${id}`);
  }




  getAllQuestions(): Observable<IPollResponse[]> {
    return this.http.get<IPollResponse[]>(`${this.api.questions}`);
  }

  createQuestion(question: any): Observable<IPollResponse> {
    return this.http.post<IPollResponse>(this.api.questions, question);
  }
  updateQuestion(question: any, id: number): Observable<IPollResponse> {
    return this.http.patch<IPollResponse>(`${this.api.questions}/${id}`, question);
  }
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.questions}/${id}`);
  }

}
