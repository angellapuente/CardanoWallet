// https://app.quicktype.io/?l=csharp

// To parse this data:
//
//   import { Convert, Wallet } from "./file";
//
//   const Wallet = Convert.toWallet(json);

export interface Wallet {
  addr: string;
  itn_reward: number;
  lovelaces: number;
  pool: string;
  reward: number;
  synched: number;
  tokens: Token[];
  utxos: number;
  vote_reward: number;
  withdrawal: number;
}

export interface Token {
  decimals?: number;
  fingerprint: string;
  metadata: Metadata;
  minted: number;
  minted_quantity: number;
  name: string;
  policy: string;
  quantity: number;
  tk: string;
  tk128: string;
  tk256: string;
  tk512: string;
}

export interface Metadata {
  image: string;
  name: string;
}

// Converts JSON strings to/from your types
export class WalletConvert {
  public static toWallet(json: string): Wallet {
    return JSON.parse(json);
  }

  public static WalletToJson(value: Wallet): string {
    return JSON.stringify(value);
  }
}
