import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BetServiceService } from '../servics/bet-service.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
})
export class MainComponentComponent implements OnInit {
  moneyDep: any;
  moneyWid: any;
  balanceTxt: any;
  balanceArr: any;
  gameTxt: string;

  constructor(private router: Router, private service: BetServiceService) {
    if (localStorage.getItem('token') === null) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.withBalance();
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  depositFunc() {
    this.service.betDeposit({ money: this.moneyDep }).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        alert(err.error.text);
        this.moneyDep = '';
        this.withBalance();
      }
    );
  }

  withDrawFunc() {
    this.service.betWithdraw({ money: this.moneyWid }).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        alert(err.error.text);
        this.moneyWid = '';
        this.withBalance();
      }
    );
  }

  withBalance() {
    this.service.betBalance().subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        this.balanceTxt = err.error.text;
        this.balanceArr = this.balanceTxt.substring(3).split(';');
      }
    );
  }

  gameFunc() {
    this.service.betGame().subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        this.gameTxt = err.error.text;
        let url = this.gameTxt.substring(72);
        window.open(url, '_blank');
      }
    );
  }
}
