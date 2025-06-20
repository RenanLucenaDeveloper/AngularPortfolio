import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light-theme' | 'dark-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light-theme');
  theme$ = this.themeSubject.asObservable();

  setTheme(theme: Theme) {
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(theme);
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
  }

  initTheme() {
    const saved = localStorage.getItem('theme') as Theme;
    this.setTheme(saved || 'light-theme');
  }

  toggleTheme() {
    const newTheme: Theme = this.themeSubject.value === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }

  get currentTheme(): Theme {
    return this.themeSubject.value;
  }
}