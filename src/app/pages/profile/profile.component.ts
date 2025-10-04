import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {JalaliDatePipe} from "../../pipes/jalali-date.pipe";
import {Profile} from "../../entities/profile";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    JalaliDatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  private _profileService = inject(ProfileService);
  profile = computed(() => this._profileService.profile())
  isLoading = computed(() => this._profileService.profileLoading())

  ngOnInit() {
    this._profileService.getProfile()
  }

  async copy(link:string){
    try {
      await navigator.clipboard.writeText(link);
      console.log('successfully copied to clipboard')
    } catch(err) {
      console.log(err)
    }
  }
}
