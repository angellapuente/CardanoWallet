import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWalletComponent } from './connect-wallet.component';

describe('ConnectWalletComponent', () => {
  let component: ConnectWalletComponent;
  let fixture: ComponentFixture<ConnectWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectWalletComponent]
    });
    fixture = TestBed.createComponent(ConnectWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
