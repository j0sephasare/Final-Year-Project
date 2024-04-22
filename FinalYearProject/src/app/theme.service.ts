import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly themeKey = 'darkMode';
  private darkModeClass = 'dark-mode';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  enableDarkMode(element: HTMLElement): void {
    this.renderer.addClass(element, this.darkModeClass);
    localStorage.setItem(this.themeKey, 'dark');
  }

  disableDarkMode(element: HTMLElement): void {
    this.renderer.removeClass(element, this.darkModeClass);
    localStorage.setItem(this.themeKey, 'light');
  }

  toggleDarkMode(element: HTMLElement): void {
    if (this.isDarkModeEnabled()) {
      this.disableDarkMode(element);
    } else {
      this.enableDarkMode(element);
    }
  }

  isDarkModeEnabled(): boolean {
    return localStorage.getItem(this.themeKey) === 'dark';
  }

  loadTheme(element: HTMLElement): void {
    if (this.isDarkModeEnabled()) {
      this.renderer.addClass(element, this.darkModeClass);
    } else {
      this.renderer.removeClass(element, this.darkModeClass);
    }
  }
}
