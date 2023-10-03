import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';
import { HttpClientModule } from '@angular/common/http';
import { TokenComponent } from './token/token.component';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
  declarations: [AppComponent, ConnectWalletComponent, TokenComponent, WalletComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
