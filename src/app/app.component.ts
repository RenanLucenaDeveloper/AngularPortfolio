import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  activeMobileMenu = false
  
  constructor() {

  }

  ngOnInit() {
  }

  toggleMobileMenu() {
    this.activeMobileMenu = !this.activeMobileMenu
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
