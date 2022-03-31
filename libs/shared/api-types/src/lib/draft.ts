import { Recipients } from "./recipients";

export interface Draft {
  body: string;
  subject: string;
  from: string
  recipients: Recipients;
}
