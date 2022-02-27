import { Component, OnInit } from '@angular/core';
import {UrlsConst} from '../../../common/consts/urls.const';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  public readonly urlList: string[] = UrlsConst;

  constructor() { }

  ngOnInit() {}

}
