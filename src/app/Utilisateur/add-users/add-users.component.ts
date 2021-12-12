import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  // ngForm: FormGroup;
  // adminData: any;
  // user: any;
  // id: any;
  // chaine : string;
  loginData: any;

  login:any;
  promotions:any;
  formgroup:FormGroup;
  Type: any;
  promotion:any;

  submitted = false;
  constructor(
    private service : UsersService, 
    private router : Router,
    public  route: ActivatedRoute,
    public formBuilder: FormBuilder,
   public toast: ToastrService

  ) { }

  ngOnInit(): void {
    this.loginData=JSON.parse(localStorage["isLogin"]);
    this.promotions = this.afficherPromotions();
    

    this.formgroup = this.formBuilder.group({

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      genre: ['', Validators.required],
      adresse: ['', Validators.required],
      login: ['', Validators.required],
      telephone: ['', Validators.required],
      etat: ['', Validators.required],
      Type:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      promotion:[''],
      motDePass: ['', [Validators.required, Validators.minLength(6)]],
      

      //confirmPassword: ['', Validators.required],
      //acceptTerms: [false, Validators.requiredTrue] //Checkbox For accept conditions 
  },);
    

  }

   afficherPromotions(){
    this.service.getAllPromotions().subscribe(
      (data)=>{
        
        this.promotions = data;
        console.log(this.promotions);
      }
    )
  }




  get f() { return this.formgroup.controls; }

  ajouterUser(fg : FormGroup){
    this.submitted = true;
    


    // stop here if form is invalid
    if (this.formgroup.invalid) {
        return;
    }

    var obj: { [id: string]: any} = {};
     
    obj.id = fg.value.promotion; 
    fg.value.promotion = obj;

    fg.value.userId =this.loginData.id



     
   console.log(JSON.stringify(fg.value));

   this.service.addUsers(fg.value).subscribe(
     
     (data)=>{
       this.router.navigateByUrl("/listUsers");
       this.showToast();
       console.log("hello world" +data);      

     }
   )
    
  }


  showToast(){
    this.toast.success("Ajout effectuer avec succes !!!");
  }

  logOut(){
    localStorage.removeItem('isLogin');
  this.router.navigateByUrl('/');
}
}
