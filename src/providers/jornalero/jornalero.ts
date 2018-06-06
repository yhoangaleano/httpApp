import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './../global';
import { IUtilResponse } from './../../interfaces/IUtilResponse';
import { IJornalero } from './../../interfaces/IJornalero';
import { map } from 'rxjs/operators';

@Injectable()
export class JornaleroProvider {

  constructor(public http: HttpClient) {
  }

  createJornalero(data: IJornalero) {

    const fecha = data.fechaNacimiento.split('-');
    data.fechaNacimiento = `${fecha[2]}/${fecha[1]}/${fecha[0]}`;

    let jornalero = JSON.stringify(data);
    let headers: HttpHeaders = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json;charset=UTF-8');

    return new Promise((resolve, reject) => {
      this.http.post(`${GLOBAL.JornarlerosAPI}v1/jornaleros`, jornalero, {
        headers: headers
      }).pipe(
        map((data:any) => {

          let respuesta : IUtilResponse = {
            objeto: data.object,
            resultado : data.result,
            mensaje : data.message,
            errores : data.errors
          }

          return respuesta;
        })
      ).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  readJornaleros() {

    let headers: HttpHeaders = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json;charset=UTF-8');

    return new Promise(resolve => {
      this.http.get(`${GLOBAL.JornarlerosAPI}v1/jornaleros`, {
        headers: headers
      }).pipe(
        map((data:any) => {

          let respuesta : IUtilResponse = {
            objeto: data.object,
            resultado : data.result,
            mensaje : data.message,
            errores : data.errors
          }

          return respuesta;
        })
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  readJornalero(idJornalero: string) {

    // let params: HttpParams = new HttpParams().set('idJornalero', idJornalero);

    let headers: HttpHeaders = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json;charset=UTF-8');

    return new Promise(resolve => {
      this.http.get(`${GLOBAL.JornarlerosAPI}v1/jornaleros/${idJornalero}`, {
        headers: headers
      }).pipe(
        map((data:any) => {

          let respuesta : IUtilResponse = {
            objeto: data.object,
            resultado : data.result,
            mensaje : data.message,
            errores : data.errors
          }

          return respuesta;
        })
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  updateJornalero(data: IJornalero) {

    const fecha = data.fechaNacimiento.split('-');
    data.fechaNacimiento = `${fecha[2]}/${fecha[1]}/${fecha[0]}`;
    let jornalero = JSON.stringify(data);

    let headers: HttpHeaders = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json;charset=UTF-8');

    return new Promise((resolve, reject) => {
      this.http.put(`${GLOBAL.JornarlerosAPI}v1/jornaleros/${data.idJornalero}`, jornalero, {
        headers: headers
      }).pipe(
        map((data:any) => {

          let respuesta : IUtilResponse = {
            objeto: data.object,
            resultado : data.result,
            mensaje : data.message,
            errores : data.errors
          }

          return respuesta;
        })
      ).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteJornalero(idJornalero: string) {

    let headers: HttpHeaders = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json;charset=UTF-8');

    return new Promise(resolve => {
      this.http.delete(`${GLOBAL.JornarlerosAPI}v1/jornaleros/${idJornalero}`, {
        headers: headers
      }).pipe(
        map((data:any) => {

          let respuesta : IUtilResponse = {
            objeto: data.object,
            resultado : data.result,
            mensaje : data.message,
            errores : data.errors
          }

          return respuesta;
        })
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


}
