import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {

  navItems = [
    {
      name: 'Dashboard', icon: 'fa-fw fa-tachometer-alt', link: '/', active: true,
    },
    {
      name: 'Profile', icon: 'fa-fw fa-folder', link: '/', active: false,
    },
    {
      name: 'Lead Manager', icon: 'fa-fw fa-folder', link: '/', active: false,
    },
    {
      name: 'BuyLeads', icon: 'fa-fw fa-folder', link: '/', active: false,
    },
    {
      name: 'Products', icon: 'fa-fw fa-folder', link: '/', active: false,
    },
    {
      name: 'Collect Payments', icon: 'fa-fw fa-chart-area', link: '/', active: false,
    },
    {
      name: 'Catalog Views', icon: 'fa-fw fa-folder', link: '/', active: false,
    },
    {
      name: 'Photos & Docs', icon: 'fa-fw fa-folder', link: '/', active: false,
    },
    {
      name: 'Invoices', icon: 'fa-fw fa-folder', link: '/', active: false,
    },
    {
      name: 'Buyer Tools', icon: 'fa-fw fa-wrench', link: '/', active: false,
    },
    {
      name: 'Settings', icon: 'fa-fw fa-cog', link: '/', active: false,
    },
    {
      name: 'Tally on web', icon: 'fa-fw fa-table', link: '/', active: false,
    },
  ]

}