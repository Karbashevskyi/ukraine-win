import {RequestMethodEnum} from '@app/common/enums/request-method.enum';

export const mainEndpointsConst = {
  get: {
    ulrList: {
      path: 'assets/json/url-list.json',
      method: RequestMethodEnum.GET
    },
  }
};
