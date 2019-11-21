import {AfterViewInit, Component, OnInit} from '@angular/core';
import {WalletApi} from '../../services/api/wallet.api';
import {HttpResponse} from '@angular/common/http';
import {Wallet, WalletList} from '../../models/api/wallet.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  private walletList: Wallet[] | null = null;

  constructor(
    private walletApi: WalletApi,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this
      .walletApi
      .list()
      .subscribe((response: HttpResponse<WalletList>) => {
        this.walletList = response.body.wallets;
      });
  }

  ngAfterViewInit(): void {

  }

  goToWallet(walletId: number) {
    this.router.navigate(['/wallet', walletId]);
  }

}
