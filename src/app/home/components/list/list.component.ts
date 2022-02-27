import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Reactive} from '@app/common/cdk/reactive';
import {MainInterfaceApi} from '@app/common/interfaces/api/main/main.interface.api';
import {ToastController} from '@ionic/angular';
import {MainServiceApp} from '@app/common/services/app/main/main.service.app';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends Reactive implements OnInit {

  public urlList: MainInterfaceApi;

  private loading: boolean = true;
  private initialize: boolean = false;

  constructor(
    private readonly toastController: ToastController,
    private readonly mainServiceApp: MainServiceApp,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {

    this.initSubscribes();

  }

  public get isLoading(): boolean {
    return this.loading;
  }

  public get isNotLoading(): boolean {
    return !this.isLoading;
  }

  public stopLoading(): void {
    console.log('stopLoading');
    this.loading = false;
    this.changeDetectorRef.detectChanges();
  }

  public startLoading(): void {
    this.loading = true;
    this.changeDetectorRef.detectChanges();
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

      console.log(urlList);

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
      console.log(navigator?.clipboard);
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

}
