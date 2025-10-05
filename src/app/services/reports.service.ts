import {inject, Injectable, signal} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {baseUrl} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Report} from "../entities/reports";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _http = inject(HttpClient);
  _reports = signal<Report[]>([])
  private async reportAction() {
    return await firstValueFrom(this._http.get<Report[]>(baseUrl + 'admin/reports'))
  }

  report() {
    this.reportAction().then(result => {
      console.log(result)
      this._reports.set(result);
    })
  }

}
