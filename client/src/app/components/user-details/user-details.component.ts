import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  name: string;
  email: string;
  newName: string;
  newPassword: string;

  constructor(
    public dialogUserDetailRef: MatDialogRef<UserDetailsComponent>,
    private dialogUserDetail: MatDialog,
  ) { }

  ngOnInit(){
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  editar(){
    
  }

  alterarNome(){

  }
}
