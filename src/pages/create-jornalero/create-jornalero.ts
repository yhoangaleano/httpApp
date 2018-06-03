import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IJornalero } from './../../interfaces/IJornalero';
import { JornaleroProvider } from './../../providers/jornalero/jornalero';
import { IUtilResponse } from './../../interfaces/IUtilResponse';

@IonicPage()
@Component({
  selector: 'page-create-jornalero',
  templateUrl: 'create-jornalero.html',
})
export class CreateJornaleroPage {

  public jornalero: IJornalero = {
    nombres: '',
    fechaNacimiento: '',
    correoElectronico: '',
    peso: 0
  };

  public registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public jornaleroProvider: JornaleroProvider,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController
  ) {

    this.createForm();

  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
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

  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  private showLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Creando jornalero...'
    });

    return loading;
  }

  public createJornalero() {

    if (this.registerForm.valid) {

      let loading = this.showLoading();
      loading.present();

      this.jornaleroProvider.createJornalero(this.jornalero).then((data: IUtilResponse) => {
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

  public closeModal(refreshList: boolean = false){
    this.viewCtrl.dismiss({
      refreshList: refreshList
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateJornaleroPage');
  }

}
