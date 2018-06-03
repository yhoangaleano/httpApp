import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { JornaleroProvider } from './../../providers/jornalero/jornalero';
import { IUtilResponse } from './../../interfaces/IUtilResponse';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public jornaleros: any[] = [];
  public jornalerosCopy: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public jornaleroProvider: JornaleroProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.readJornaleros();
  }

  private showLoading(message: string = 'Cargando jornaleros...') {
    let loading = this.loadingCtrl.create({
      content: message
    });

    return loading;
  }

  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  private readJornaleros() : void {

    let loading = this.showLoading();
    loading.present();

    this.jornaleroProvider.readJornaleros().then((data: IUtilResponse) => {
      loading.dismiss();
      this.jornaleros = data.objeto;
      this.jornalerosCopy = data.objeto;
    }).catch((error) => {
      console.log(error);
    });

  }

  public openModal() : void{

    let modalCreateJornalero = this.modalCtrl.create('CreateJornaleroPage');
    modalCreateJornalero.onDidDismiss((data) => {
      if(data.refreshList) this.readJornaleros();
    })
    modalCreateJornalero.present();

  }

  public editJornalero(jornalero) : void{

    let modalUpdateJornalero = this.modalCtrl.create('UpdateJornaleroPage', jornalero);
    modalUpdateJornalero.onDidDismiss((data) => {
      if(data.refreshList) this.readJornaleros();
    })
    modalUpdateJornalero.present();

  }

  showAlertDelete(idJornalero) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar eliminación',
      message: '¿En verdad desea eliminar el jornalero?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.deleteJornalero(idJornalero);
          }
        }
      ]
    });
    alert.present();
  }

  public deleteJornalero(idJornalero) : void{

    let loading = this.showLoading('Eliminando jornalero...');
    loading.present();

    this.jornaleroProvider.deleteJornalero(idJornalero).then((data: IUtilResponse) => {
      loading.dismiss();
      this.showToast(data.mensaje);
      this.readJornaleros();
    }).catch((error) => {
      console.log(error);
    });

  }

}
