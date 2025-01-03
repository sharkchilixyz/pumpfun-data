import { Router, Request, Response } from 'express';
import { WebhookService } from '../services/webhook';
import { HeliusWebhookData } from '../types/helius';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const webhookData = req.body as HeliusWebhookData[];
    const webhookService = new WebhookService();
    const results = webhookService.processWebhookData(webhookData);
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;