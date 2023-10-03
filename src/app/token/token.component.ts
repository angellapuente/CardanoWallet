import { Component, Input, OnInit, Output } from '@angular/core';
import { Token } from '../connect-wallet/Interfaces/Wallet';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent implements OnInit {
  @Input() token: Token | null = null;

  isIpfs = false;
  ipfs = '';

  constructor() {}
  ngOnInit(): void {
    if (this.token?.metadata?.image.startsWith('ipfs://')) {
      this.isIpfs = true;
      this.ipfs = this.token?.metadata.image.replace('ipfs://', '');
    } else
      console.log(
        this.token?.metadata?.image,
        this.token?.metadata?.image.startsWith('ipfs://'),
        'Do not start with'
      );
  }

  printTokenOnConsole() {
    console.log(this.token);
  }
}
