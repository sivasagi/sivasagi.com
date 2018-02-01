import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ngOnInit(){
  	window.onbeforeunload = function(){
  		window.scrollTo(0,0);
  	}
  }

}
