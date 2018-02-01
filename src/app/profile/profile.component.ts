import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { FormsModule, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data1: any;
  showMessage:boolean = false;
  constructor(@Inject(DOCUMENT) public document: any) { }

  ngOnInit() {
   
  }
  submitData(form:NgForm){
    this.showMessage = true;
    form.reset();
  }

  @HostListener('window:scroll', [])
    onWindowScroll() {
        const scroll = this.document.documentElement.scrollTop
        if(scroll> 190 || scroll === undefined){
			this.data1 = true;
		}else{
			this.data1 = false;
		}
    }
}
