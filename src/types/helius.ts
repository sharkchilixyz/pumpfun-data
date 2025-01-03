// 只保留实际使用的类型
export interface HeliusWebhookData {
  type: string;
  timestamp: number;
  signature: string;
  instructions: Instruction[];
}

interface Instruction {
  programId: string;
  innerInstructions: InnerInstruction[];
}

interface InnerInstruction {
  programId: string;
  data: string;
}