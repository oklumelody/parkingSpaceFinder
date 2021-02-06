import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {

  verifyform: FormGroup;
  codeExpected = 123456;
  verifycode: number;
  isWrong = false;
  shake = false;

  constructor(private formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit() {
    this.verifyform = this.formBuilder.group({
      first: ['', Validators.required],
      second: ['', Validators.required ],
      third: ['', Validators.required],
      forth: ['' , Validators.required],
      fifth: ['', Validators.required],
      sixth: ['', Validators.required]
    })
  }

  inpController(event, next, prev){
    if(event.target.value.length < 1 && prev){
      prev.focus();
    }
    else if(next && event.target.value.length>0){
      next.focus();
    }
    else {
     return 0;
    }
  }

  onSubmit() {
    let code = parseInt(Object.values(this.verifyform.value).join(''));
    console.log(code);
    this.verifycode = code;

    if(code == this.codeExpected){
      this.verifyform.reset();
      this.router.navigateByUrl('/places/tabs/dicover');
    }else{
      this.isWrong = true;
      this.shake = true;
      this.verifyform.reset();
      setTimeout(()=>{this.shake = false}, 500);
    }
  }

  get form() {
    return this.verifyform.controls;
  }

}