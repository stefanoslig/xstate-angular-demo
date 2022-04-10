import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Draft, Violation } from '@xstate-angular-demo/shared/api-types';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  mailMachineModel,
  MailStoreService,
} from '@xstate-angular-demo/mail/data-access';
import { debounceTime, map, merge, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'xstate-angular-demo-mail-compose',
  templateUrl: './mail-compose.component.html',
  styleUrls: ['./mail-compose.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailComposeComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  draftForm!: FormGroup;
  violations$!: Observable<Array<Violation>>;
  secureSend$!: Observable<boolean>;
  promptState$!: Observable<boolean>;
  draftInvalid$!: Observable<boolean>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly mailStoreService: MailStoreService
  ) {}

  ngOnInit() {
    this.draftForm = this.buildForm();

    this.violations$ = this.mailStoreService.state$.pipe(
      map((state) => state.context.violations)
    );
    this.secureSend$ = this.mailStoreService.state$.pipe(
      map((state) => state.matches('SECURE_SEND_ON'))
    );
    this.draftInvalid$ = this.mailStoreService.state$.pipe(
      map((state) => state.matches('SECURE_SEND_ON.INVALID'))
    );
    this.promptState$ = this.mailStoreService.state$.pipe(
      map((state) => state.matches('SECURE_SEND_OFF.PROMPT'))
    );

    this.draftForm
      .get('subject')
      ?.valueChanges.pipe(debounceTime(200), untilDestroyed(this))
      .subscribe((subject) =>
        this.mailStoreService.send(
          mailMachineModel.events.draftChanged({
            ...this.draftForm.value,
            subject,
          })
        )
      );

    this.draftForm
      .get('body')
      ?.valueChanges.pipe(debounceTime(200), untilDestroyed(this))
      .subscribe((body) =>
        this.mailStoreService.send(
          mailMachineModel.events.draftChanged({
            ...this.draftForm.value,
            body,
          })
        )
      );

    this.to?.valueChanges
      .pipe(debounceTime(200), untilDestroyed(this))
      .subscribe((to) =>
        this.mailStoreService.send(
          mailMachineModel.events.draftChanged({
            ...this.draftForm.value,
            recipients: { to },
          })
        )
      );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.to?.value.push(value);
      this.to?.updateValueAndValidity();
    }

    event.chipInput?.clear();
  }

  remove(to: string): void {
    const index = this.to?.value.indexOf(to);

    if (index >= 0) {
      this.to?.value.splice(index, 1);
      this.to?.updateValueAndValidity();
    }
  }

  toggle() {
    this.mailStoreService.send(mailMachineModel.events.toggle());
  }

  get to() {
    return this.draftForm.get('recipients')?.get('to');
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      from: ['stefanos@gmail.com'],
      recipients: this.fb.group({
        to: [[]],
      }),
      subject: [''],
      body: [''],
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MailComposeComponent],
  exports: [MailComposeComponent],
})
export class MailFeatureComposeComponentModule {}
