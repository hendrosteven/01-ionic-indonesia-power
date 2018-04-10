import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Todo } from '../../classes/todo';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  todo: Todo = new Todo();

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  onSave(){
    this.viewCtrl.dismiss(this.todo);
  }
}
