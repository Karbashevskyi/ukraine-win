import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {MainInterfaceApi} from '@app/common/interfaces/api/main/main.interface.api';
import {mainEndpointsConst} from '@app/common/consts/endpoints/main.endpoints.const';

@Injectable({
  providedIn: 'root'
})
export class MainServiceApi {

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getUrlList(): Observable<MainInterfaceApi> {
    return this.apiService.request<MainInterfaceApi>({
      endpoint: mainEndpointsConst.get.ulrList
    });
  }

}
