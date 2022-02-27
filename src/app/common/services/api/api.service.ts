import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {RequestParamsInterface} from '@app/common/interfaces/request/request-params.interface';
import {EndpointReplaceInterface} from '@app/common/interfaces/endpoints/endpoint-replace.interface';
import {RequestOptionsInterface} from '@app/common/interfaces/request/request-options.interface';
import {CheckersTool} from '@app/common/tools/checkers.tool';
import {catchError, tap} from 'rxjs/operators';
import {HandleErrorServiceService} from '../handle-error-service.service';
import {ConvertTool} from '@app/common/tools/convert.tool';
import {environment} from '@src/environments/environment';

export const REPLACE_MAP_REGEX = /{(\w*)}/g;

export type DefaultParamType = { [key: string]: string | string[] };
export type DefaultParamTypeWithArray = { [key: string]: string | string[] | number[] };
export type DefaultParamTypeWithString = DefaultParamType | string;
export type DefaultParamTypeString = { [key: string]: string };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly handleErrorServiceService: HandleErrorServiceService,
  ) {

  }

  /**
   *
   * @param params
   */
  public static buildHttpParamsByObject(params: any): string {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (CheckersTool.isNotNullOrUndefined(params[key])) {
        if (Array.isArray(params[key])) {
          (params[key] as any[]).forEach((value) => {
            httpParams = httpParams.append(key, value);
          });
        } else {
          httpParams = httpParams.append(key, params[key]);
        }
      }
    });

    return httpParams.toString();
  }

  /**
   *
   * @param requestParams
   * @param options
   */
  public static getUrl(requestParams?: RequestParamsInterface, options?: RequestOptionsInterface): string {

    let url: string = environment.host;
    url += (requestParams ? (requestParams?.replaceMap ? ApiService.convertPathToUrl(requestParams.endpoint.path, requestParams.replaceMap) : requestParams.endpoint.path) : '');

    if (requestParams?.buildUrlWithParams) {

      url += `?${this.buildHttpParamsByObject(options.params)}`;
      delete options.params;

    }

    return url;

  }

  /**
   *  <T> it is Generic
   * @param requestParams
   * @param options
   */
  public request<T>(requestParams: RequestParamsInterface, options?: RequestOptionsInterface): Observable<T> {

    if (CheckersTool.isNotNullOrUndefinedOrEmpty(options?.params)) {
      options.params = ConvertTool.clearObject({
        ...options.params
      });
    }

    const url: string = ApiService.getUrl(requestParams, options);

    if (requestParams?.buildUrlWithParams) {

      delete options.params;

    }

    // if (requestParams?.endpoint?.showLoading) {
    //   this.loadingFullScreenService.activateLoader();
    // }

    // TODO SOLID!!!!!!!!

    return this.httpClient.request(
      requestParams.endpoint.method,
      url,
      options
    ).pipe(
      tap(_ => {
        // if (requestParams?.endpoint?.showLoading) {
        //   this.loadingFullScreenService.deactivateLoader();
        // }
      }),
      catchError((error) => {
        // if (requestParams?.endpoint?.showLoading) {
        //   this.loadingFullScreenService.deactivateLoader();
        // }
        if (requestParams?.dontUseDefaultErrorHandler) {
          return throwError(error);
        } else {
          return this.handleErrorServiceService.handle(error, requestParams?.error ?? null);
        }
      })
    );

  }

  /**
   *
   * @param path
   * @param replaceMap
   */
  private static convertPathToUrl(path: string, replaceMap: EndpointReplaceInterface): string {
    const keys = Object.keys(replaceMap);
    if (ApiService.checkPathAndReplaceMap(path, replaceMap)) {
      return path.replace(REPLACE_MAP_REGEX, (m, key) => keys.includes(key) ? `${replaceMap[key]}` : '');
    }
    return '';
  }

  /**
   *
   * @param path
   * @param replaceMap
   * @private
   */
  private static checkPathAndReplaceMap(path: string, replaceMap: EndpointReplaceInterface) {
    const match = path.match(REPLACE_MAP_REGEX);
    const replaceMapKeyList = Object.keys(replaceMap);
    if (match.length === replaceMapKeyList.length) {
      const notFoundKeyList = replaceMapKeyList.filter((replaceKey) => match.findIndex((key) => key.search(replaceKey) > -1) < 0);
      if (notFoundKeyList.length === 0) {
        return true;
      }
      throw new Error(`checkPathAndReplaceMap: Unknown items found (${notFoundKeyList.length}).`);
    }
    throw new Error('checkPathAndReplaceMap: Do not match.');
  }

}
