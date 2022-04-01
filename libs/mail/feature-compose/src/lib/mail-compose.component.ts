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
import { Recipient, Violation } from '@xstate-angular-demo/shared/api-types';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  mailMachineModel,
  MailStoreService,
} from '@xstate-angular-demo/mail/data-access';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'xstate-angular-demo-mail-compose',
  templateUrl: './mail-compose.component.html',
  styleUrls: ['./mail-compose.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailComposeComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  recipients: Recipient[] = [];
  draftForm!: FormGroup;
  violations$!: Observable<Array<Violation>>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly mailStoreService: MailStoreService
  ) {}

  ngOnInit() {
    this.draftForm = this.fb.group({
      to: [''],
      subject: [''],
      body: [''],
    });

    this.draftForm.valueChanges.subscribe((draft) =>
      this.mailStoreService.send(mailMachineModel.events.draftChanged(draft))
    );

    this.violations$ = this.mailStoreService.state$.pipe(map((state) => state.context.violations));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.recipients.push({ email: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(to: Recipient): void {
    const index = this.recipients.indexOf(to);

    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
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
