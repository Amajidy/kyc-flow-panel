import {Component, computed, inject, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private _profileService = inject(ProfileService);
  profile = computed(() => this._profileService.profile())
  isLoading = computed(() => this._profileService.profileLoading())

  ngOnInit() {
    this._profileService.getProfile()
  }
}
