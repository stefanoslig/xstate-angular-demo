import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@xstate-angular-demo/shared/data-access';
import {
  AdminSettings,
  Draft,
  ViolationsResponse,
} from '@xstate-angular-demo/shared/api-types';

@Injectable({
  providedIn: 'root',
})
export class MailApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL) private readonly apiUrl: string
  ) {}

  fetchSettings(): Observable<AdminSettings> {
    return this.http.get<AdminSettings>(`${this.apiUrl}/settings`);
  }

  validateDraft(draft: Draft): Observable<ViolationsResponse> {
    return this.http.post<ViolationsResponse>(`${this.apiUrl}/violations`, {
      draft,
    });
  }
}
