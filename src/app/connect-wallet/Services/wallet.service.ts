import { Injectable } from '@angular/core';
import { Token, Wallet } from '../Interfaces/Wallet';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, BaseAddress } from '@emurgo/cardano-serialization-lib-asmjs';

//https://cips.cardano.org/cips/cip30/

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private wallet: Wallet | null = null;

  public get Wallet(): Wallet | null {
    return this.wallet;
  }
  cardano: any = null;
  Api: any = null;
  walletProvider: any = null;
  mainAdress = '';

  public connecting = false;

  constructor(private http: HttpClient) {
    this.cardano = (window as any).cardano;
    console.log((window as any).cardano);
    if (this.cardano) {
      this.walletProvider = this.cardano.eternl;
      console.log('eternl', (window as any).cardano.eternl);

      if (!this.walletProvider) {
        this.walletProvider = this.cardano.nami;
        console.log('nami', (window as any).cardano.nami);
      }
    }
  }

  public connectWallet() {
    console.log('connecting wallet...');

    if (this.walletProvider) {
      this.connecting = true;
      this.Api = this.walletProvider
        .enable()
        .then((api: any) => {
          this.initialAction(api);
        })
        .catch((error: any) => {
          this.connecting = false;
          console.error(`onRejected function called: ${error.message}`);
        });
    } else {
      console.error(
        'No Wallet Provider detected, reload the browser with a wallet extension enabled for this page.'
      );
    }
  }

  private initialAction(api: any) {
    api
      .getUsedAddresses()
      .then((adds: any) => {
        // To print all the uses adresses on console
        // this.printAdressOnConsole(adds);

        //We only need the firt one, because Pool.pm provide the stakeadress with all the tokens.
        const first_bench32Adress = Address.from_hex(adds[0]).to_bech32();
        this.mainAdress = first_bench32Adress;

        this.getWallet(first_bench32Adress);
      })
      .catch((error: any) => {
        this.connecting = false;
        console.error(`onRejected function called: ${error.message}`);
      });
  }

  printAdressOnConsole(adds: string[]) {
    console.log('List of adresses:');
    adds.forEach((add: any) => {
      const bench32Adress = Address.from_hex(add).to_bech32();
      console.log(bench32Adress);
    });
  }

  getWalletData(add: string): Observable<Object> {
    return this.http.get('https://pool.pm/wallet/' + add);
  }

  getWallet(first_bench32Adress: string) {
    this.getWalletData(first_bench32Adress).subscribe({
      next: (data) => {
        console.log(data);
        this.wallet = data as Wallet;
        console.log(this.wallet);
        this.connecting = false;
      },
      error: (error) => {
        this.connecting = false;
        console.error('There was an error!', error);
      },
    });
  }

  getAda(): number {
    if (!this.wallet) {
      return 0;
    }
    return Math.trunc(this.wallet?.lovelaces / 1000000);
  }

  getAdaString(): string {
    return this.formatNumber(this.getAda()+"");
  }

  public getAddr(): string {
    if (!this.wallet) {
      return '';
    }
    return this.wallet?.addr.substring(this.wallet?.addr.length - 8);
  }

  public getTokenQuantity(token: Token) {
    if (token == null) {
      return 0;
    }

    const decimals: number = token.decimals == null ? 0 : token.decimals;

    if (decimals == 0) {
      return token.quantity;
    }

    return Math.trunc(token.quantity / Math.pow(10, decimals));
  }


  getTokenQuantityString(token: Token): string {
  
    return this.formatNumber(this.getTokenQuantity(token)+"");
  }


  getWalletImageIconUrl() {
    return this.walletProvider.icon;
  }

   public formatNumber( num: string ) {
    // verificamos si existe el signo "-", si está, lo almacenamos en la variable 
    // **signo** y acortamos la cadena recibida
 let signo = "";
 let posSigno = num.indexOf( "-" );
 if( posSigno != -1 ) {
     signo = "-";
     num = num.substring( 1 );             
 }

    // verificamos si hay un ".", si no hay, instanciamos **aux** con ",00"
    // si hay y está a "1" del fin, lo hacemos con el último número más "0"
    // y le quitamos los decimales a **num**
    // en otro caso, instanciamos **aux** con los valores contenidos después 
    // del punto, y acortamos **num** 
 let aux = "";
 let pos = num.indexOf( "." );
 if( pos == -1 ) {
     aux = ",00";
 }
 else if( pos == num.length -2 ) {
     aux = "," + num.substring( pos + 1 ) + "0";
     num = num.substring( 0, pos );
 }
 else {
     aux = "," + num.substring( pos + 1 );  
     num = num.substring( 0, pos );
 }

 let contador = 1;
 let salida = "";

    // recorremos el array en sentido inverso y vamos agregando adelante de 
    // lo ya contenido, el valor encontrado en esa posición, si el contador
    // es multiplo de "3", agregamos un "."
 for( let i = num.length -1; i > -1; i-- ) {
     salida = num.substring( i, i + 1 ) + salida;
     if( contador  % 3 == 0 ) { 
         salida = "." + salida;
     }
     contador ++;
 }

    // retornamos la concatenación del signo, los enteros y los decimales
 return signo + salida; // + aux; // quito los decimales
}

}
