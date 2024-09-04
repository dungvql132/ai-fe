import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  isUserMenuOpen = false;
  selectedLanguage: string;

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('lang') || 'en';
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  switchLanguage(language: string): void {
    localStorage.setItem("lang",language);
    location.reload();
    console.log("lang: ",language);
    
  }
}
