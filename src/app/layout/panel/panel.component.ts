import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  private _authService = inject(AuthService);

  logout(){
    this._authService.logout();
  }
}
