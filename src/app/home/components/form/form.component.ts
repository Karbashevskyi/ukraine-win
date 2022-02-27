import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {IonInput, ToastController} from '@ionic/angular';
import {MainServiceApp} from '@app/common/services/app/main/main.service.app';
import {CheckersTool} from '@app/common/tools/checkers.tool';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  @ViewChild('linkInput')
  public readonly linkInput: IonInput;

  public form: FormGroup;

  constructor(
    private readonly mainServiceApp: MainServiceApp,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  public addNewLink(): void {

    if (this.form.invalid) {
      this.linkInput.setFocus();
      return;
    }

    const value: {
      link: string
    } = this.form.value;

    if (CheckersTool.isNotNullOrUndefinedOrEmpty(value)) {

      this.mainServiceApp.addUrlToList(value.link);
      this.form.reset();

    }

  }

  private initForm(): void {

    this.form = this.formBuilder.group({
      link: [null, [Validators.required]]
    });

    // TODO valid
    // if (url.endsWith(".ru/") && url.startsWith("http")) {
    //   targets[url] = {number_of_requests: 0, number_of_errored_responses: 0};
    //   rebuildTable();
    // } else {
    //   alert("URL повинен починатись з http:// або https:// та закінчуватись на .ru/");
    // }

    this.changeDetectorRef.detectChanges();

  }
}
