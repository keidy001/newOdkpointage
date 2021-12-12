import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {
  adminData: any;
  ngForm: FormGroup;
  user: any;
  id: any;
  chaine : string;
  loginData: any;
  formgroup: FormGroup;
  userngForm: NgForm;
  submitted= false;


  constructor( 
    public service: UsersService,
    public  route: ActivatedRoute,
    public router : Router,
    public formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.loginData=JSON.parse(localStorage["isLogin"]);
    this.formgroup = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      horaireDebutJournee: ['', Validators.required],
      horaireFinJournee: ['', Validators.required],
      nom: ['', Validators.required],
      nombreFemmes: ['', Validators.required],
      nombreHommes: ['', Validators.required],

      //confirmPassword: ['', Validators.required],
      //acceptTerms: [false, Validators.requiredTrue] //Checkbox For accept conditions 
  },);
  }

  showToaster(){
    this.toastr.success("AJout effectuer avec succes !!!")
}


  get f() { return this.formgroup.controls; }




  ajouterPromotion(fg : FormGroup){
    this.submitted = true;
  
    


    // stop here if form is invalid
    if (this.formgroup.invalid) {
        return;
    }

    var obj: { [id: string]: any} = {};
     
    obj.id = fg.value.profile; 
    fg.value.profile = obj;
     fg.value.userId =this.loginData.id
     
   console.log(JSON.stringify(fg.value));

   this.service.addPromotion(fg.value).subscribe(
     
     (data)=>{
      this.showToaster();
       this.router.navigateByUrl("/listPromotion");
     
       console.log("hello world" +data);         
     }
   )
    
  }
  logOut(){
    localStorage.removeItem('isLogin');
  this.router.navigateByUrl('/');
}
}
