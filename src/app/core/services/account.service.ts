import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../enums/type.enum';

export class User {
  username: string;
  password: string;
  type: Category;
  constructor(username: string, password: string, type: Category) {
    this.username = username;
    this.password = password;
    this.type = type;
  }
}

export class Patients {
  name: string;
  notifications: number;
  constructor(name: string, notifications: number) {
    this.name = name;
    this.notifications = notifications;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userList: User[] = [];
  public user: User | null = null;
  public isPatient = false;
  public failures = [] as any[];
  public patients = [
    new Patients('Apoorv Jain', 4),
    new Patients('Prapti Kawthekar', 0),
    new Patients('Shivanshu Vishnoi', 2),
    new Patients('Ankush A', 0),
    new Patients('Ankita Chattar', 3),
    new Patients('Gaurang Pancholi', 5),
    new Patients('Ankush Saxena', 8),
  ]

  constructor(private router: Router, private http: HttpClient) {
    this.userList = [
      new User('gunjan.pandey@db.com', 'dementia', Category.CARETAKER),
      new User('ankush.a@db.com', 'dementia', Category.PATIENT),
      new User('gunjan', 'redhat', Category.PATIENT),
    ];
  }

  login(username: string, password: string) {
    for (var i = 0; i < this.userList.length; i++) {
      if (
        this.userList[i].username === username &&
        this.userList[i].password === password
      ) {
        if(this.userList[i].type === Category.PATIENT){
            this.isPatient = true;
        }
        else{
            this.isPatient = false;
        }
        this.user = this.userList[i];
        this.router.navigate(['/event-planner']);
        return true;
      }
    }
    return false;
  }

  logout() {
    // remove user from local storage and set current user to null
    this.user = null;
    this.isPatient = false;
    this.router.navigate(['/logout']);
  }
}
