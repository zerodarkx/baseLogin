import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  get usuario(){
    return this.sAuth.usuario;
  }

  constructor(
    private router: Router,
    private sAuth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigateByUrl('/auth');
    this.sAuth.logout();
  }

}
