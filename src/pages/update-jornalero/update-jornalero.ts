import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { IJornalero } from './../../interfaces/IJornalero';
import { JornaleroProvider } from './../../providers/jornalero/jornalero';
import { IUtilResponse } from './../../interfaces/IUtilResponse';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-update-jornalero',
  templateUrl: 'update-jornalero.html',
})
export class UpdateJornaleroPage {

  public jornalero : IJornalero;

  public updateForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public jornaleroProvider: JornaleroProvider,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController
  ) {

    this.jornalero = {
      idJornalero: this.navParams.get('idJornalero'),
      nombres: this.navParams.get('nombres'),
      fechaNacimiento: this.navParams.get('fechaNacimiento'),
      correoElectronico: this.navParams.get('correoElectronico'),
      peso: this.navParams.get('peso')
    }

    this.createForm();
  }

  private createForm() {
    this.updateForm = this.formBuilder.group({
      nombres: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      fechaNacimiento: ['', Validators.compose([
        Validators.required
      ])],
      correoElectronico: ['', Validators.compose([
        Validators.email,
        Validators.minLength(4),
      ])],
      peso: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])],
    });
  }

  public updateJornalero() {

    if (this.updateForm.valid) {

      let loading = this.showLoading();
      loading.present();

      this.jornaleroProvider.updateJornalero(this.jornalero)
      .then((data: IUtilResponse) => {
        loading.dismiss();
        this.showToast(data.mensaje);
        if (data.resultado) {
          this.closeModal(true);
        } else {
          console.log(data.errores);
        }
      }).catch((error) => {
        console.log(error);
      });

    }
  }

  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  private showLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Actualizando jornalero...'
    });

    return loading;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateJornaleroPage');
  }

  public closeModal(refreshList: boolean = false){
    this.viewCtrl.dismiss({
      refreshList: refreshList
    });
  }

}
