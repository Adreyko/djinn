import { Request, Response } from 'express';
import { clerkService, ClerkService } from './clerk.service';

import { ClerkWebhookData } from './clerk.service';
import { UserService, userService } from '../user/user.service';

export class ClerkController {
  constructor(
    private readonly userService: UserService,
    private readonly clerkService: ClerkService
  ) {}

  public handleWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await this.clerkService.verifyWebhook(
        req.headers,
        JSON.stringify(req.body)
      );

      const webhookData = event as ClerkWebhookData;
      const userData = this.clerkService.extractUserData(webhookData.data);

      const user = await this.userService.createOrUpdateUser(userData);

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
}

export const clerkController = new ClerkController(userService, clerkService);
