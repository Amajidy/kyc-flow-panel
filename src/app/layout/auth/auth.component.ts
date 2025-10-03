import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  private _router = inject(Router);
   _activatedRoute = inject(ActivatedRoute);

  activeRoute: string = this._router.url.split('/').at(-1) ?? 'login';
  routeStatus = signal<boolean>(this.activeRoute !== 'register');
  ngOnInit() {

  }

  changeRoute(route: string){
    this._router.navigateByUrl('auth/' + route);
    this.routeStatus.update((status) => !status);
  }

}
