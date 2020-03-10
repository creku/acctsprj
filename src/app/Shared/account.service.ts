import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Account } from './account.model'
import { isDefined } from '@angular/compiler/src/util';
import { isNull } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  formData: Account;
  acctId:string;
  constructor(private db: AngularFirestore) {

  }

  getAccounts() {
    return this.db.collection('accounts',ref => ref.orderBy('actName')).snapshotChanges();
   // return this.db.list('/accounts').valueChanges();
  }

  addAccount(account:Account)
  {
    
    let acct=Object.assign({},this.formatAccount(account));
    delete acct.id; // Remove id field from data 
    this.db.collection('accounts').doc(acct.actName).set(this.formatAccount(acct));
  }

  updateActBalance(acct:Account)
  {
    
    this.db.collection('accounts').doc(acct.actName).update({totAmount:acct.totAmount});

  }

  updateActCommission(acct:Account)
  {

       this.db.collection('accounts').doc(acct.actName).update({totAmount:acct.totAmount,
                                                              comsRate:acct.comsRate      });

  }




  formatAccount(account:Account){
    account.actName=account.actName.trim().toUpperCase();
    account.totAmount=Math.round(account.totAmount);
    if(!isDefined(account.comsRate)||isNull(account.comsRate))
    account.comsRate=0;

    return account;
  }

}
