import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../environment/environment";
import {firstValueFrom} from "rxjs";
import {Profile} from "../entities/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _http = inject(HttpClient);

  profileLoading = signal<boolean>(false);

  profile = signal<Profile | null>(null)

  async profileAction() {
    return await firstValueFrom(this._http.get<Profile>(baseUrl + 'admin/profile'))
  }

  getProfile() {
    this.profileLoading.set(true);
    this.profileAction().then(profile => {
      this.profile.set(profile);
    }).finally(() => {
      this.profileLoading.set(false);
    })
  }
}
