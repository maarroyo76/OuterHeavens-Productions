import { AfterViewInit, Component } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name!: string;
  lastName!: string;
  email!: string;
  birthday!: string;

  eventType!: string;
  selectedEvent!: string;
  events: {name: string, price: number}[] = [];
  isEventsDisabled: boolean = true;

  ticketPrice: number = 0;
  ticketType: string = '';
  isTicketTypeDisabled: boolean = true;
  ticketQuantity: number = 1;
  subtotal: number = 0;
  totalDiscount: number = 0;
  discount: number = 0;
  total: number = 0;

  isModalOpen: boolean = false;

  constructor(
    private animationController: AnimationController,
    private toastController: ToastController
  ) {}

  ngAfterViewInit():void {
    this.animationHeader();
    this.animationTitle();
    this.animationSubtitle();
    this.animationForm();
    this.animationButton();
    this.animationFooter();
  }

  animationHeader() {
    const element = document.getElementById('header');
    if(element){
      this.animationController
      .create()
      .addElement(element)
      .duration(1500)
      .keyframes([
        { offset: 0, transform: 'translateX(-100px)', opacity: '0.1' },
        { offset: 0.5, transform: 'translateX(-50px)', opacity: '0.5' },
        { offset: 1, transform: 'translateX(0px)', opacity: '1' },
      ])
      .play()
    }
  }

  animationTitle() {
    const element = document.getElementById('title');
    if(element){
      this.animationController
      .create()
      .addElement(element)
      .duration(1500)
      .keyframes([
        { offset: 0, transform: 'translateY(-100px)', opacity: '0.1' },
        { offset: 0.5, transform: 'translateY(-50px)', opacity: '0.5' },
        { offset: 1, transform: 'translateY(0px)', opacity: '1' },
      ])
      .play()
    }
  }

  animationSubtitle() {
    const element = document.getElementById('subtitle');
    if(element){
      this.animationController
      .create()
      .addElement(element)
      .duration(1500)
      .keyframes([
        { offset: 0, transform: 'translateY(-100px)', opacity: '0.1' },
        { offset: 0.5, transform: 'translateY(-50px)', opacity: '0.5' },
        { offset: 1, transform: 'translateY(0px)', opacity: '1' },
      ])
      .play()
    }
  }

  animationForm() {
    const element = document.getElementById('form');
    if(element){
      this.animationController
      .create()
      .addElement(element)
      .duration(1500)
      .keyframes([
        { offset: 0, transform: 'translateY(-100px)', opacity: '0.1' },
        { offset: 0.5, transform: 'translateY(-50px)', opacity: '0.5' },
        { offset: 1, transform: 'translateY(0px)', opacity: '1' },
      ])
      .play()
    }
  }

  animationButton() {
    const element = document.getElementById('button');
    if(element){
      this.animationController
      .create()
      .addElement(element)
      .duration(1500)
      .keyframes([
        { offset: 0, transform: 'translateY(-100px)', opacity: '0.1' },
        { offset: 0.5, transform: 'translateY(-50px)', opacity: '0.5' },
        { offset: 1, transform: 'translateY(0px)', opacity: '1' },
      ])
      .play()
    }
  }

  animationFooter() {
    const element = document.getElementById('footer');
    if(element){
      this.animationController
      .create()
      .addElement(element)
      .duration(1500)
      .keyframes([
        { offset: 0, transform: 'translateX(100px)', opacity: '0.1' },
        { offset: 0.5, transform: 'translateX(50px)', opacity: '0.5' },
        { offset: 1, transform: 'translateX(0px)', opacity: '1' },
      ])
      .play()
    }
  }

  private getEventOptions(eventType: string): { name: string, price: number }[] {
    switch (eventType) {
      case 'concert':
        return [
          { name: 'Concierto A', price: 50000 },
          { name: 'Concierto B', price: 60000 },
          { name: 'Concierto C', price: 70000 }
        ];
      case 'theatre':
        return [
          { name: 'Teatro X', price: 30000 },
          { name: 'Teatro Y', price: 35000 },
          { name: 'Teatro Z', price: 40000 }
        ];
      case 'sports':
        return [
          { name: 'Deporte 1', price: 20000 },
          { name: 'Deporte 2', price: 25000 },
          { name: 'Deporte 3', price: 30000 }
        ];
      default:
        return [];
    }
  }
  
  get formattedBirthday(): string {
    return this.birthday ? new Date(this.birthday).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) : '';
  }

  get age(): number | undefined {
    if (!this.birthday) {
      return undefined;
    }

    const today = new Date();
    const birthDate = new Date(this.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  isFormComplete(): boolean {
    return !!this.name && !!this.lastName && !!this.email && !!this.birthday && !!this.selectedEvent;
  }

  onDateChange(event: any) {
    this.birthday = event.detail.value;
  }

  onEventTypeChange() {
    this.events = this.getEventOptions(this.eventType);
    this.isEventsDisabled = this.events.length === 0;
    this.selectedEvent = '';
    this.ticketPrice = 0;
    this.isTicketTypeDisabled = true;
  }

  onEventChange() {
    const event = this.events.find(e => e.name === this.selectedEvent);
    this.ticketPrice = event ? event.price : 0;

    this.isTicketTypeDisabled = !this.selectedEvent;
  }

  ticketTypeChange() {
    switch (this.ticketType) {
      case 'VIP':
        this.ticketPrice = this.ticketPrice * 1.5;
        break;
      case 'Preferencial':
        this.ticketPrice = this.ticketPrice * 1.25;
        break;
    }
  }

  calculateDiscount() {
    if (this.age && this.age < 18) {
      this.discount = 0.5;
    } else if (this.age && this.age >= 18 && this.age <= 25) {
      this.discount = 0.2;
    } else if (this.age && this.age > 25 && this.age <= 30) {
      this.discount = 0.1;
    }else if (this.age && this.age > 65)
      this.discount = 0.3;
  }

  increase(){
    if(this.ticketQuantity < 10){
      this.ticketQuantity++;
    }
  }

  decrease(){
    if(this.ticketQuantity > 1){
      this.ticketQuantity--;
    }
  }

  calculateTotal() {
    this.ticketTypeChange();
    this.subtotal = this.ticketPrice * this.ticketQuantity;
    this.totalDiscount = this.subtotal * this.discount;
    this.total = this.subtotal - this.totalDiscount;
  }

  openModal() {
    this.calculateDiscount();
    this.calculateTotal();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  clearForm() {
    this.name = '';
    this.lastName = '';
    this.email = '';
    this.birthday = '';
    this.eventType = '';
    this.selectedEvent = '';
    this.events = [];
    this.isEventsDisabled = true;
    this.ticketPrice = 0;
    this.discount = 0;
    this.total = 0;
    this.ticketType = '';
    this.isTicketTypeDisabled = true;
    this.ticketQuantity = 1;
    this.subtotal = 0;
    this.totalDiscount = 0;
  }

  async onBuy() {
    this.clearForm();
    this.closeModal();
    this.showToastMessage('Compra realizada con exito!', 'success');
  }

  async onClear() {
    this.clearForm();
    this.closeModal();
    this.showToastMessage('Compra cancelada', 'danger');
  }

  async showToastMessage(message: string, color: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

}
