export interface TokenBalanceChange {
    mint: string;
    rawTokenAmount: {
      decimals: number;
      tokenAmount: string;
    };
    tokenAccount: string;
    userAccount: string;
  }
  
  export interface AccountData {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: TokenBalanceChange[];
  }
  
  export interface TokenTransfer {
    fromTokenAccount: string;
    fromUserAccount: string;
    mint: string;
    toTokenAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    tokenStandard: string;
  }
  
  export interface HeliusWebhookData {
    accountData: AccountData[];
    tokenTransfers: TokenTransfer[];
    type: string;
    fee: number;
    feePayer: string;
  }