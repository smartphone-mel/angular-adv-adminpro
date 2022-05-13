import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    console.log('. SettingsService Init!');
    // ...
    const theme = localStorage.getItem('theme');
    let sUrl = '';

    sUrl = theme == null ? './assets/css/colors/default-dark.css'
        : theme;
    this.linkTheme?.setAttribute('href', sUrl);
  }

  changeTheme(theme: string) {
    const sUrl: string = `./assets/css/colors/${theme}.css`;
    
    this.linkTheme?.setAttribute('href', sUrl);
    localStorage.setItem('theme', sUrl);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    let aList = document.querySelectorAll('.selector');
    
    aList.forEach( (x: Element) => {
        const sClass = 'working',
            sThemeUrl = this.linkTheme?.getAttribute('href'),
            sTheme = x.getAttribute('data-theme'),
            sUrl = `./assets/css/colors/${sTheme}.css`;
        x.classList.remove(sClass);

        if (sThemeUrl === sUrl)
          x.classList.add(sClass);
      } );
  }
}
