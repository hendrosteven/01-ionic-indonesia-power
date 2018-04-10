import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AddPage } from '../add/add';
import { Todo } from '../../classes/todo';
import { DetailPage } from '../detail/detail';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: Todo[] = [];
  searching: any = false;
  searchTerm: string = '';
  searchControl: FormControl;
  todosOriginal: Todo[] = [];
  found: boolean = true;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
      this.searchControl = new FormControl();
  }

  onAdd(){
    let modalAdd =  this.modalCtrl.create(AddPage);
    modalAdd.onDidDismiss(todo => {
      if(todo){
        this.todos.push(todo);
        this.todosOriginal.push(todo);
        let alert = this.alertCtrl.create({title: "Success", message: "Todo saved!", buttons:['Ok']});
        alert.present();
      }
    });
    modalAdd.present();
  } 

  onDetail(item: Todo){
    this.navCtrl.push(DetailPage,item);
  }

  onDelete(title: string){
    let temp = this.todos.filter((todo:Todo) => {
      return todo.title !== title;
    });
    this.todos = temp;
    this.todosOriginal = temp;
  }

  onSearch(){
    this.searching = true;
  }

  ionViewDidLoad(){
    this.searchControl.valueChanges
    .pipe(debounceTime(2000))
    .subscribe(search =>{
      this.searching = false;
      this.onStartSearching();
    });
  }

  onStartSearching(){
    if(this.searchTerm.length>0){
      this.todos = [];
      this.todosOriginal.forEach(todo => {
        if(todo.title.toUpperCase().indexOf(this.searchTerm.toUpperCase()) > - 1){
          this.todos.push(todo);
        }
      });
      if(this.todos.length<=0){
        this.found = false;
      }else{
        this.found = true;
      }
    }else{
      this.todos = this.todosOriginal;
    }
    this.searching = false;
  }

  // notFound(){
  //   this.todos = [];
  //   let todo = new Todo();
  //   todo.title = 'No records found';
  //   this.todos.push(todo);
  // }
}
