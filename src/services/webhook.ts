import { HeliusWebhookData } from '../types/helius';
import { decodePumpFunInstruction } from '../utils/instruction-decoder';

export class WebhookService {
  private readonly PUMPFUN_PROGRAM_ID = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P';

  processWebhookData(data: any[]) {
    const results = [];

    for (const transaction of data) {
      if (transaction.type !== 'SWAP') continue;

      const pumpFunInstructions = transaction.instructions.filter(
        (instruction: any) => instruction.programId === this.PUMPFUN_PROGRAM_ID
      );

      for (const instruction of pumpFunInstructions) {
        const innerPumpFunInstructions = instruction.innerInstructions.filter(
          (inner: any) => inner.programId === this.PUMPFUN_PROGRAM_ID
        );

        for (const innerInstruction of innerPumpFunInstructions) {
          try {
            const decoded = decodePumpFunInstruction(innerInstruction.data);
            
            const result = {
              type: 'inner',
              instructionData: decoded,
              timestamp: transaction.timestamp,
              signature: transaction.signature
            };

            console.log(`
              Pump purchase Information
              -------------------------
              Signature: ${result.signature}
              Mint: ${decoded.mint}
              Sol Amount: ${(Number(decoded.solAmount) / 1e9).toFixed(9)} SOL
              Token Amount: ${(Number(decoded.tokenAmount) / 1e6).toFixed(6)}
              Action: ${decoded.isBuy ? 'Buy' : 'Sell'}
              User: ${decoded.user}
              Virtual SOL Reserves: ${(Number(decoded.virtualSolReserves) / 1e9).toFixed(9)} SOL
              Virtual Token Reserves: ${(Number(decoded.virtualTokenReserves) / 1e6).toFixed(6)}
              Timestamp: ${new Date(result.timestamp * 1000).toISOString()}
            `);

            results.push(result);
          } catch (error:any) {
            console.error(`Error decoding inner instruction: ${error.message}`);
          }
        }
      }
    }

    return {
      success: true,
      decodedInstructions: results,
      totalInstructions: results.length
    };
  }
}