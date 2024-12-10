import { Request, Response, NextFunction } from 'express';
import { ClerkWebhookData, userService, UserService } from './user.service';
import { IncomingHttpHeaders } from 'http';
import { Webhook } from 'svix';
import { config } from '../../config/config';

export class UserController {
  constructor(private readonly userService: UserService) {}

  public createOrUpdateUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const event = await this.handleClerkWebhookVerification(
        req.headers,
        JSON.stringify(req.body)
      );

      const webhookData = event as ClerkWebhookData;
      const userData = this.userService.extractUserData(webhookData.data);

      req.body = userData;
      const user = await this.userService.createOrUpdateUser(req.body);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      const error = err as Error;

      res.status(error.message.includes('Missing') ? 400 : 500).json({
        success: false,
        message: error.message || 'Internal server error processing webhook',
      });
    }
  };

  public async handleClerkWebhookVerification(
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
}

export const userController = new UserController(userService);
