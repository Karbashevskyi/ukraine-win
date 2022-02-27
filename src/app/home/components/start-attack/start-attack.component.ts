import {Component, OnInit} from '@angular/core';
import {StartServiceApp} from '@app/common/services/app/main/start.service.app';

@Component({
  selector: 'app-start-attack',
  templateUrl: './start-attack.component.html',
})
export class StartAttackComponent implements OnInit {

  constructor(
    private readonly startServiceApp: StartServiceApp
  ) {
  }

  ngOnInit() {
  }

  public get isStarted(): boolean {
    return this.startServiceApp.saveUkraineIsStarted;
  }

  public start(): void {

    this.startServiceApp.startSaveUkraine();

  }

  public stop(): void {

    this.startServiceApp.stopSaveUkraine();

  }

}
