import {EndpointsInterface} from './endpoints.interface';

export interface EndpointsGroupInterface {
  post?: EndpointsInterface;
  delete?: EndpointsInterface;
  get?: EndpointsInterface;
  put?: EndpointsInterface;
}
