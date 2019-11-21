import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {WalletApi} from '../../services/api/wallet.api';
import {HttpResponse} from '@angular/common/http';
import {Wallet, WalletResponse} from '../../models/api/wallet.model';
import {ActivatedRoute, Params} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, AfterViewInit, OnDestroy {

  private wallet: Wallet = null;
  private walletId: number;
  private paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private walletApi: WalletApi,
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      this.walletId = params.walletId;
      this.walletApi.wallet(this.walletId)
        .subscribe((response: HttpResponse<WalletResponse>) => {
          this.wallet = response.body.wallet;
        });

    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.paramsSubscription = null;
  }

}
