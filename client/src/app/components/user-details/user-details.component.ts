import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatExpansionModule,
    MatAccordion,
  ]
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
