import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions : Array<any>=[
    {titre:"Home" , "route":"/home",icon : "house"},
    {titre:"Products" , "route":"/product",icon : "search"},
    {titre:"New Product" , "route":"/newProduct",icon : "safe"}
  ]
  currentAction : any ;

  setcurrentAction(action: any) {
    this.currentAction=action;

  }
}
