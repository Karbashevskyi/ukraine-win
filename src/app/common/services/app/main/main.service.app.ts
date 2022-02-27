import {Injectable} from '@angular/core';
import {MainServiceApi} from '@app/common/services/api/main/main.service.api';
import {Observable, ReplaySubject} from 'rxjs';
import {MainInterfaceApi} from '@app/common/interfaces/api/main/main.interface.api';
import {Reactive} from '@app/common/cdk/reactive';
import {CheckersTool} from '@app/common/tools/checkers.tool';
import {ToastController} from '@ionic/angular';
import {UrlInterfaceModel} from '@app/common/interfaces/models/url/url.interface.model';
import {UrlModel} from '@app/common/model/url/url.model';
import {setTimeout$} from '@app/common/tools/tool';

@Injectable({
  providedIn: 'root' // TODO module
})
export class MainServiceApp extends Reactive {

  private urlList: MainInterfaceApi;
  private urlListCustom: UrlInterfaceModel[] = [];
  private _autoUpdate: boolean = true;

  private readonly _urlList$: ReplaySubject<MainInterfaceApi> = new ReplaySubject<MainInterfaceApi>(1);

  constructor(
    private readonly mainServiceApi: MainServiceApi,
    private readonly toastController: ToastController,
  ) {
    super();
  }

  public getUrlList(): MainInterfaceApi {
    return this.urlList;
  }

  public get urlList$(): Observable<MainInterfaceApi> {
    return this._urlList$.asObservable();
  }

  public updateSourceUrlList(): void {

    this.mainServiceApi.getUrlList().pipe(this.takeUntil()).subscribe((urlList: {
      list: string[],
    }) => {

      this.urlList = {
        list: urlList?.list?.map((url) => new UrlModel(url))
      };
      this.updateLocalSource();

    });

  }

  public updateLocalSource(): void {

    this.mergeCustomAndExternalUrlList();

  }

  /**
   *
   * @param deleteTheUrl
   */
  public deleteUrlFromList(deleteTheUrl: string): void {

    if (CheckersTool.isNotNullOrUndefinedOrEmpty(this.urlList)) {

      const foundIndex: number = this.urlList?.list?.findIndex((urlModel) => urlModel.url === deleteTheUrl);

      if (foundIndex > -1) {

        this.urlList?.list?.splice(foundIndex, 1);

        this.updateLocalSource();
        this.toastController.create({
          header: 'Delete link',
          message: 'Success',
          duration: 2000
        }).then((toast) => {
          toast.present();
        });

      }

    }

  }

  public addUrlToList(addTheUrl: string): void {

    if (CheckersTool.isNotNullOrUndefinedOrEmpty(addTheUrl)) {

      const notFoundElements = !this.urlListCustom?.some((urlModel) => urlModel.url === addTheUrl);

      if (notFoundElements) {

        this.urlListCustom.push(new UrlModel(addTheUrl));
        this.updateLocalSource();
        this.toastController.create({
          header: 'Add new link',
          message: 'Success',
          duration: 2000
        }).then((toast) => {
          toast.present();
        });

      }

    }

  }

  public mergeCustomAndExternalUrlList(): void {

    const concatLists: UrlInterfaceModel[] = (this.urlList?.list ?? []).concat(this.urlListCustom ?? []);

    if (CheckersTool.isNotNullOrUndefinedOrEmpty(concatLists)) {

      this.urlList = {
        list: concatLists
      };

    }

    this._urlList$.next(this.urlList);

  }

  public startAutoUpdateUrlList(): void {

    this._autoUpdate = true;
    this.kernelOfAutoUpdateUrlList();

  }

  public stopAutoUpdateUrlList(): void {

    this._autoUpdate = false;

  }

  private kernelOfAutoUpdateUrlList(): void {

    if (this._autoUpdate) {

      setTimeout$(() => {

        this.updateSourceUrlList();

        this.kernelOfAutoUpdateUrlList();

      }, 15 * 60 * 1000);

    }

  }

}
