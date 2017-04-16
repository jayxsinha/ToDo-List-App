import { Component } from '@angular/core';
import {TodoService} from './../../providers/todo-service';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: Observable<any>;
  constructor(public navCtrl: NavController,
  public todoService: TodoService,
  public alertCtrl: AlertController,
  public toastCtrl: ToastController) {
this.loadTodos();
  }

  loadTodos() {
  this.todos = this.todoService.getTodos();
  }

  addTodo() {
    let prompt = this.alertCtrl.create({
      title: 'Add Todo',
      message: 'Enter the Todo',
      inputs: [{
      name: 'text',
      placeholder: 'Enter the Text for your new Todo'
      }],
      buttons: [
      {
      text: 'Cancel'
      },
      {
      text: 'Save',
      handler: data => {
      this.todoService.addTodo(data.text).subscribe(data=>
      {
      this.showToast(data.msg);
      this.loadTodos();
      });
      }
      }
      ]
    });
    prompt.present();
  }
  removeTodo(id){
    this.todoService.deleteTodo(id).subscribe( data => {
    this.showToast(data.msg);
    this.loadTodos();
    });
  }
  private showToast(message: string) {
    let toast = this.toastCtrl.create({
    message: message,
    duration: 3000
    });
  }
}
