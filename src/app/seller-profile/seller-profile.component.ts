import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrl: './seller-profile.component.css'
})

export class SellerProfileComponent {

  activeTab: string = 'rating-review';

  onTabClick(tab: any) {
    this.activeTab = tab;
  }

}
