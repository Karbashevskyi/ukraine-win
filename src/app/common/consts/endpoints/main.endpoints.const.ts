import {RequestMethodEnum} from '@app/common/enums/request-method.enum';
import {SourceEnum} from '@app/common/enums/source.enum';

export const mainEndpointsConst = {
  get: {
    ulrList: {
      path: '/src/assets/json/url-list.json',
      method: RequestMethodEnum.GET,
      source: SourceEnum.GITHUB
    },
  }
};
