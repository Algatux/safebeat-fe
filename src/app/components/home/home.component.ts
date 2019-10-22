import {Component, OnInit} from '@angular/core';
import {WalletApi} from '../../services/api/wallet.api';
import {HttpResponse} from '@angular/common/http';
import {Wallet, WalletList} from '../../models/api/wallet.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private walletList: Wallet[] | null = null;

  constructor(private walletApi: WalletApi) {
  }

  ngOnInit() {
    console.log(this.walletList);
    this
      .walletApi
      .list()
      .subscribe((response: HttpResponse<WalletList>) => {
        this.walletList = response.body.wallets;
        console.log(this.walletList);
      });
  }

}
