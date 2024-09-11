import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import trans from '../shared/trans';

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
  role: string;
  name: string;
  translations: any;

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('lang') || 'en';
    this.role = localStorage.getItem('role') || '';
    this.name = localStorage.getItem('name') || '';

    const lang = localStorage.getItem("lang");
    this.translations = trans[lang] || trans['en'];
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  switchLanguage(language: string): void {
    localStorage.setItem("lang",language);
    location.reload();
    console.log("lang: ",language);
    
  }

  logout(): void {
    // Clear the relevant fields from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
  }
}
