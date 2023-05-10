import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {deleteDoc, doc, Firestore, updateDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLoginSubject = new Subject<boolean>();
  constructor(
    private afs: Firestore,
  ) { }

  updateUser(user: any, id: string) {
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return updateDoc(userDocumentReference, {...user});
  }
  deleteUser(id: string) {
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return deleteDoc(userDocumentReference);
  }
}
