import {EndpointReplaceInterface} from '../endpoints/endpoint-replace.interface';
import {EndpointInterface} from '../endpoints/endpoint.interface';

export interface RequestParamsInterface {
  endpoint: EndpointInterface;
  replaceMap?: EndpointReplaceInterface;
  dontUseDefaultErrorHandler?: boolean;
  buildUrlWithParams?: boolean;
  error?: {
    endpointCode?: string;
    closeableSnackbar?: boolean;
    data?: any;
  };

}
