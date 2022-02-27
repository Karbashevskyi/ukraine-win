import {UrlInterfaceModel} from '@app/common/interfaces/models/url/url.interface.model';

export class UrlModel implements UrlInterfaceModel {

  constructor(
    public url: string,
    public numberOfRequests: number = 0,
    public numberOfErroredResponses: number = 0,
  ) {
  }

  public incrementNumberOfRequests(): void {
    this.numberOfRequests += 1;
  }

  public incrementNumberOfErroredResponses(): void {
    this.numberOfRequests += 1;
  }

  // TODO get status if success

}
