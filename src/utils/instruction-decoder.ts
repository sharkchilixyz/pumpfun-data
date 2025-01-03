import bs58 from 'bs58';
import BN from 'bn.js';

interface DecodedPumpFunData {
  mint: string;
  solAmount: string;
  tokenAmount: string;
  isBuy: boolean;
  user: string;
  timestamp: number;
  virtualSolReserves: string;
  virtualTokenReserves: string;
}

export function decodePumpFunInstruction(encodedData: string): DecodedPumpFunData {
  const buffer = bs58.decode(encodedData);
  
  // 直接从偏移量 16 开始读取 mint
  let offset = 16;
  
  // 读取 mint (32 bytes)
  const mint = bs58.encode(buffer.slice(offset, offset + 32));
  offset += 32;
  
  // 读取 solAmount (8 bytes)
  const solAmount = new BN(buffer.slice(offset, offset + 8), 'le').toString();
  offset += 8;
  
  // 读取 tokenAmount (8 bytes)
  const tokenAmount = new BN(buffer.slice(offset, offset + 8), 'le').toString();
  offset += 8;
  
  // 读取 isBuy (1 byte)
  const isBuy = buffer[offset] === 1;
  offset += 1;
  
  // 读取 user (32 bytes)
  const user = bs58.encode(buffer.slice(offset, offset + 32));
  offset += 32;
  
  // 读取 timestamp (8 bytes)
  const timestamp = new BN(buffer.slice(offset, offset + 8), 'le').toNumber();
  offset += 8;
  
  // 读取 virtualSolReserves (8 bytes)
  const virtualSolReserves = new BN(buffer.slice(offset, offset + 8), 'le').toString();
  offset += 8;
  
  // 读取 virtualTokenReserves (8 bytes)
  const virtualTokenReserves = new BN(buffer.slice(offset, offset + 8), 'le').toString();

  return {
    mint,
    solAmount,
    tokenAmount,
    isBuy,
    user,
    timestamp,
    virtualSolReserves,
    virtualTokenReserves
  };
}