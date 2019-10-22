import {User} from './user.model';

export interface WalletList {
  wallets: Wallet[];
}

export interface Wallet {
  id: number;
  title: string;
  createdAt: string;
  owner: User;
}
