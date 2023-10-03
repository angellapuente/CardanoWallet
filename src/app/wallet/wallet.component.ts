import { Component } from '@angular/core';
import { WalletService } from '../connect-wallet/Services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  constructor(public walletService: WalletService) {}

  printWalletOnConsole() {
    console.log(this.walletService.Wallet);
  }
}
