import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _settings: SettingsService) { }

  ngOnInit(): void {
    this._settings.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this._settings.changeTheme(theme);
  }
}
