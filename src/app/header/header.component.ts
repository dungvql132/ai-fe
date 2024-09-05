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
  role: string;
  name: string;

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('lang') || 'en';
    this.role = localStorage.getItem('role') || '';
    this.name = localStorage.getItem('name') || '';
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
