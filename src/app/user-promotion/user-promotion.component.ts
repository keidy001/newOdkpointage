import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-promotion',
  templateUrl: './user-promotion.component.html',
  styleUrls: ['./user-promotion.component.css']
})
export class UserPromotionComponent implements OnInit {
  detailPromotion: any;
  id: any;
  loginData:any;
  listPointage:any
  constructor(
    public service: UsersService,
     public route : ActivatedRoute,
     private router: Router,
     ) { }

     ngOnInit(): void {
      this.loginData=JSON.parse(localStorage["isLogin"]);
      this.id = this.route.snapshot.params['id'];
      this.service.detailPromotion(this.id).subscribe(data=>{
        this.detailPromotion = data;
        console.log(data);
      })
    }
    logOut(){
      localStorage.removeItem('isLogin');
    this.router.navigateByUrl('/');
  }
  

}
