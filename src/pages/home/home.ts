import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AddPage } from '../add/add';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  todos: string[] = [];

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    
  }

  onAdd(){
    //this.todos.push(this.todo);
    let modalAdd =  this.modalCtrl.create(AddPage);
    modalAdd.onDidDismiss(todo => {
      if(todo){
        this.todos.push(todo);
        let alert = this.alertCtrl.create({title: "Success", message: "Todo saved!", buttons:['Ok']});
        alert.present();
      }
    });
    modalAdd.present();
  }

}
