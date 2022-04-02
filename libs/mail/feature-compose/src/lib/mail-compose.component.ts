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
import { debounceTime, map, Observable } from 'rxjs';
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
  recipients: string[] = [];
  draftForm!: FormGroup;
  violations$!: Observable<Array<Violation>>;
  secureSend$!: Observable<boolean>;
  draftInvalid$!: Observable<boolean>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly mailStoreService: MailStoreService
  ) {}

  ngOnInit() {
    this.draftForm = this.buildForm();
    this.sendDraftOnChanges();

    this.violations$ = this.mailStoreService.state$.pipe(
      map((state) => state.context.violations)
    );
    this.secureSend$ = this.mailStoreService.state$.pipe(
      map((state) => state.matches('TOGGLE.SECURE_SEND_ON'))
    );
    this.draftInvalid$ = this.mailStoreService.state$.pipe(
      map((state) => state.matches('MAIL.INVALID'))
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.recipients.push(value);
    }

    event.chipInput?.clear();
  }

  remove(to: string): void {
    const index = this.recipients.indexOf(to);

    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
  }

  toggle() {
    this.mailStoreService.send(mailMachineModel.events.toggle());
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      from: ['stefanos@gmail.com'],
      to: [''],
      subject: [''],
      body: [''],
    });
  }

  private sendDraftOnChanges() {
    this.draftForm.valueChanges
      .pipe(debounceTime(200), untilDestroyed(this))
      .subscribe((values) =>
        this.mailStoreService.send(
          mailMachineModel.events.draftChanged({
            from: values.from,
            recipients: { to: this.recipients },
            subject: values.subject,
            body: values.body,
          })
        )
      );
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
