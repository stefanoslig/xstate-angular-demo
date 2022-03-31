import express from 'express';
import cors from 'cors';
import { settings } from './app/settings';
import {
  Draft,
  Violation,
  ViolationsResponse,
} from '@xstate-angular-demo/shared/api-types';
import bodyParser from 'body-parser';
import { parseAddressList, parseOneAddress } from 'email-addresses';
import crypto from 'crypto';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const blackList = ['bsn', 'personal data', 'passport']

app.get('/settings', (req, res) => {
  res.json(settings);
});

app.post<unknown, ViolationsResponse, Draft>('/violations', (req, res) => {
  const draft = req.body;
  const fromDomain: string = (parseOneAddress(draft.from) as any).domain;

  const externalDomains = parseAddressList(
    draft.recipients.to.join(', ')
  ).filter((item) => (item as any).domain !== fromDomain);
  const violations: Array<Violation> = [];

  if (externalDomains.length > 0) {
    violations.push({
      id: crypto.randomUUID(),
      description: "One of the recipients doesn't belong to this domain",
    });
  }

  if(draft.subject && textIncludesWordFromBlacklist(draft.subject)) {
    violations.push({
      id: crypto.randomUUID(),
      description: "The subject contains sensitive data",
    });
  }

  if(draft.body && textIncludesWordFromBlacklist(draft.body)) {
    violations.push({
      id: crypto.randomUUID(),
      description: "The body contains sensitive data",
    });
  }
  // Mimic network latency
  setTimeout(() => {
    res.json({
      isValid: violations.length === 0,
      violations,
    });
  }, Math.random() * 3000);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


function textIncludesWordFromBlacklist(text: string) {
  for (let i = 0; i < blackList.length; i++) {
    if (text.includes(blackList[i])) {
     return true;
    }
  }

  return false;
}
