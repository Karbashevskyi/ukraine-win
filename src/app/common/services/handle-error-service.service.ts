import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorServiceService {

  constructor() {
  }

  public handle(
    error: HttpErrorResponse,
    params?: {
      endpointCode?: string;
      closeableSnackbar?: boolean;
      data?: any;
    }
  ): Observable<never> {

    // TODO

    return throwError(error);
  }

}
