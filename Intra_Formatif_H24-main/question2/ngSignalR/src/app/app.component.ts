import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
    this.hubConnection.on("UpdateNbUsers", (data) => {
      this.nbUsers = data
    });

    this.hubConnection.on("UpdateMoney", (data) => {
      this.money = data
    });
    this.hubConnection.on("UpdateNbPizzasAndMoney", (money, pizza) => {
      this.money = money,
      this.nbPizzas = pizza
    });
    this.hubConnection.on("UpdatePizzaPrice", (data) => {
      this.pizzaPrice = data
    });

    this.hubConnection.start().then(() => {
      console.log('connecté');
      this.isConnected = true;
    }).catch(err => console.log('error while starting : ' + err))
  }

  selectChoice(selectedChoice:number) {
    this.selectedChoice = selectedChoice;
    this.hubConnection!.invoke('SelectChoice', this.selectedChoice);
  }

  unselectChoice() {
    this.selectedChoice = -1;
    this.hubConnection!.invoke('UnSelectChoice', this.selectedChoice);

  }

  addMoney() {
    this.hubConnection!.invoke('AddMoney', this.selectedChoice);
  }

  buyPizza() {
    this.hubConnection!.invoke('BuyPizza', this.selectedChoice);
  }
}
