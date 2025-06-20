import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cvPath } from './util/cv.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  activeMobileMenu = false
  scrolled = false
  selectedLanguage: string
  actualTheme: string

  headerForm: FormGroup
  
  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private fb: FormBuilder
  ) {
    this.themeService.initTheme()
    this.actualTheme = this.themeService.currentTheme

    const userLang = navigator.language || 'pt';
    const languageCode = userLang.split('-')[0]
    this.selectedLanguage = languageCode

    this.translateService.setDefaultLang(languageCode)
    this.translateService.use(languageCode)

    this.headerForm = this.fb.group({
      lang: [languageCode]
    })
  }

  ngOnInit() {
    this.onWindowScroll()

    this.headerForm.controls['lang'].valueChanges.subscribe({
      next: (data: string) => {
        this.changeLang(data)
      }
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

  toggleMobileMenu() {
    this.activeMobileMenu = !this.activeMobileMenu
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.actualTheme = this.themeService.currentTheme
  }

  changeLang(lang: string) {
    this.translateService.setDefaultLang(lang)
    this.translateService.use(lang)
    this.selectedLanguage = lang
  }

  downloadCV() {
    const link = document.createElement('a');

    link.href = cvPath[this.selectedLanguage];
    link.download = 'CV - Renan Lucena dos Santos.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
