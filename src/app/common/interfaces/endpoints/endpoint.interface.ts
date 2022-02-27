import {RequestMethodEnum} from '../../enums/request-method.enum';
import {SourceEnum} from '@app/common/enums/source.enum';

export interface EndpointInterface {
  method: RequestMethodEnum;
  source: SourceEnum;
  path: string;
  showLoading?: boolean;
}
