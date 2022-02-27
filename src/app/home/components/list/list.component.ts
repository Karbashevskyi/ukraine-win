import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Reactive} from '@app/common/cdk/reactive';
import {MainInterfaceApi} from '@app/common/interfaces/api/main/main.interface.api';
import {ToastController} from '@ionic/angular';
import {MainServiceApp} from '@app/common/services/app/main/main.service.app';
import {UrlModel} from '@app/common/model/url/url.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends Reactive implements OnInit {

  public urlList: MainInterfaceApi;

  private loading: boolean = true;
  private initialize: boolean = false;

  constructor(
    private readonly toastController: ToastController,
    private readonly mainServiceApp: MainServiceApp,
    // private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {

    this.initSubscribes();
    this.initAutoUpdateUrlList();

  }

  public get isLoading(): boolean {
    return this.loading;
  }

  public get isNotLoading(): boolean {
    return !this.isLoading;
  }

  public stopLoading(): void {
    this.loading = false;
    // this.changeDetectorRef.detectChanges();
  }

  public startLoading(): void {
    this.loading = true;
    // this.changeDetectorRef.detectChanges();
  }

  public isInitialize(): boolean {
    return this.initialize;
  }

  public isNotInitialize(): boolean {
    return !this.isInitialize();
  }

  private initSubscribes(): void {

    this.initSubscribeUrlList();

  }


  private initSubscribeUrlList(): void {

    this.mainServiceApp.urlList$.pipe(this.takeUntil()).subscribe((urlList: MainInterfaceApi) => {

      if (this.isNotInitialize()) {

        this.initialize = true;

      }

      this.urlList = urlList;

      this.stopLoading();

    });

    this.updateUrlList();

  }

  private updateUrlList(): void {

    this.startLoading();
    this.mainServiceApp.updateSourceUrlList();

  }

  /**
   *
   * @param url
   */
  public copyToClipboard(url: string): void {

    if (!navigator?.clipboard) {
      return;
    }

    navigator.clipboard.writeText(url).then(() => {
      this.toastController.create({
        header: 'Copy to clipboard',
        message: 'Success!',
        duration: 2000,
      }).then((toast) => {
        toast.present();
      });
    }, (err) => {
      console.error('Async: Could not copy text: ', err);
    });

  }

  /**
   *
   * @param url
   */
  public deleteItemFromList(url: string): void {
    this.mainServiceApp.deleteUrlFromList(url);
  }

  private initAutoUpdateUrlList(): void {

    this.mainServiceApp.startAutoUpdateUrlList();

  }

  /**
   *
   * @param index
   * @param item
   */
  public trackByFn(index, item: UrlModel) {
    return item.url;
  }

}
