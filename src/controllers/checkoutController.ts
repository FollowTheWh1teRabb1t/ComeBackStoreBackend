import { Request, Response } from 'express';
import { CheckoutService } from '../services/checkoutService';

export class CheckoutController {
  private checkoutService = new CheckoutService();

  async create(request: Request, response: Response) {
    const { items } = request.body;

    const checkoutUrl = await this.checkoutService.createSession(items);

    return response.json({ url: checkoutUrl });
  }
}
