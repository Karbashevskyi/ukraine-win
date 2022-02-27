import {HttpHeaders, HttpParams} from '@angular/common/http';

export interface RequestOptionsInterface {
  body?: any;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body' | 'response';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  responseType?: 'json' | 'blob' | 'arraybuffer';
  reportProgress?: boolean;
  withCredentials?: boolean;


}
