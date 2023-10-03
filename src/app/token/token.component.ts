import { Component, Input, OnInit, Output } from '@angular/core';
import { Token } from '../connect-wallet/Interfaces/Wallet';
import { WalletService } from '../connect-wallet/Services/wallet.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent implements OnInit {
  @Input() token: Token | null = null;

  ipfsWeb = 'https://ipfs.io/ipfs/';

  srcImage = '';

  constructor(public walletService: WalletService) {}
  ngOnInit(): void {
    let tokenSrc: string | undefined = '';

    if (Array.isArray(this.token?.metadata?.image)) {
      tokenSrc = this.token?.metadata?.image[0];
    } else {
      tokenSrc = this.token?.metadata?.image;
    }

    if (tokenSrc?.startsWith('ipfs://')) {
      this.srcImage = this.ipfsWeb + tokenSrc.replace('ipfs://', '');
    } else if (tokenSrc?.startsWith('ipfs//')) {
      this.srcImage = this.ipfsWeb + tokenSrc.replace('ipfs//', '');
    } else if (!tokenSrc?.includes('/')) {
      this.srcImage = this.ipfsWeb + tokenSrc + '';
    } else {
      this.srcImage = tokenSrc;
    }
  }

  printTokenOnConsole() {
    console.log(this.token);
  }
}
