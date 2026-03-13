import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'login',
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {}
