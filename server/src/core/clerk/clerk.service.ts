import { IncomingHttpHeaders } from 'http';
import { Webhook } from 'svix';
import { config } from '../../config/config';

export interface ClerkWebhookData {
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
      verification: any;
    }>;
    username: string;
    first_name?: string;
    last_name?: string;
    [key: string]: any;
  };
}

export class ClerkService {
  public async verifyWebhook(
    headers: IncomingHttpHeaders,
    payload: string | Buffer
  ) {
    const SIGNING_SECRET = config.CLERK;

    if (!SIGNING_SECRET) {
      throw new Error('Missing CLERK signing secret in configuration');
    }

    const webhook = new Webhook(SIGNING_SECRET);
    const svixId = headers['svix-id'];
    const svixTimestamp = headers['svix-timestamp'];
    const svixSignature = headers['svix-signature'];

    if (
      !svixId ||
      !svixTimestamp ||
      !svixSignature ||
      Array.isArray(svixId) ||
      Array.isArray(svixTimestamp) ||
      Array.isArray(svixSignature)
    ) {
      throw new Error('Missing or invalid Svix headers');
    }

    return webhook.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  }

  public extractUserData(data: ClerkWebhookData['data']) {
    if (!data.email_addresses?.[0]?.email_address) {
      throw new Error('Email address is required');
    }

    return {
      clerkId: data.id,
      email: data.email_addresses[0].email_address,
      firstName: data.first_name,
      lastName: data.last_name,
    };
  }
}

export const clerkService = new ClerkService();
