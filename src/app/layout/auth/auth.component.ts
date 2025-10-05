import {Component, inject} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter, map, startWith} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,

  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private _router = inject(Router);

  activeRoute = toSignal(this._router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.urlAfterRedirects),
    startWith(this._router.url), // برای گرفتن URL فعلی حتی قبل از اولین NavigationEnd
    map(route => route.split('/').at(-1))
  ))

  changeRoute(route: string){
    this._router.navigateByUrl('auth/' + route);
  }

}
