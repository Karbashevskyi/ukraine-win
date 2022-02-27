import {RequestMethodEnum} from '../../enums/request-method.enum';

export interface EndpointInterface {
  method: RequestMethodEnum;
  path: string;
  showLoading?: boolean;
}
