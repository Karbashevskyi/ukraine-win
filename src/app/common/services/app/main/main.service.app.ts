import {Injectable} from '@angular/core';
import {MainServiceApi} from '@app/common/services/api/main/main.service.api';
import {Observable, ReplaySubject} from 'rxjs';
import {MainInterfaceApi} from '@app/common/interfaces/api/main/main.interface.api';
import {Reactive} from '@app/common/cdk/reactive';
import {CheckersTool} from '@app/common/tools/checkers.tool';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root' // TODO module
})
export class MainServiceApp extends Reactive {

  private urlList: MainInterfaceApi;
  private urlListCustom: string[] = [];

  private readonly _urlList$: ReplaySubject<MainInterfaceApi> = new ReplaySubject<MainInterfaceApi>(1);

  constructor(
    private readonly mainServiceApi: MainServiceApi,
  private readonly toastController: ToastController,
  ) {
    super();
  }

  public get urlList$(): Observable<MainInterfaceApi> {
    return this._urlList$.asObservable();
  }

  public updateSourceUrlList(): void {

    this.mainServiceApi.getUrlList().pipe(this.takeUntil()).subscribe((urlList: MainInterfaceApi) => {

      console.log(urlList);
      this.urlList = urlList;
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

      const foundIndex: number = this.urlList?.list?.findIndex((url) => url === deleteTheUrl);

      if (foundIndex > -1) {

        this.urlList?.list?.splice(foundIndex, 1);

        this.updateLocalSource();
        this.toastController.create({
          header: 'Delete link',
          message: 'Success'
        }).then((toast) => {
          toast.present();
        });

      }

    }

  }

  public addUrlToList(addTheUrl: string): void {

    if (CheckersTool.isNotNullOrUndefinedOrEmpty(addTheUrl)) {

      const notFoundElements = !this.urlListCustom?.some((url) => url === addTheUrl);

      if (notFoundElements) {

        this.urlListCustom.push(addTheUrl);
        this.updateLocalSource();
        this.toastController.create({
          header: 'Add new link',
          message: 'Success'
        }).then((toast) => {
          toast.present();
        });

      }

    }

  }

  public mergeCustomAndExternalUrlList(): void {

    const concatLists: string[] = (this.urlList?.list ?? []).concat(this.urlListCustom ?? []);

    if (CheckersTool.isNotNullOrUndefinedOrEmpty(concatLists)) {

      this.urlList = {
        list: concatLists
      };

    }

    this._urlList$.next(this.urlList);

  }

}
