import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunciotns();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(
    private settingsServices: SettingsService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    customInitFunciotns();
    this.sidebarService.cargarMenu();
  }
}
