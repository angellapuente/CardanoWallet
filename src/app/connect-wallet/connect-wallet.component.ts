import { Component, OnInit } from '@angular/core';
import { WalletService } from './Services/wallet.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss'],
})
export class ConnectWalletComponent implements OnInit {
  constructor(public walletService: WalletService) {}

  public ngOnInit(): void {
    setTimeout(() => {
      // <<<---using ()=> syntax
      this.walletService.connectWallet();
    }, 1000);
  }
}
