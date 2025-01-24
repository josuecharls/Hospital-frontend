import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(
    private httpCliente: HttpClient,
  ) {}

  LeerTodo(cantidadPag: number, numPagina: number, textoBusqueda: string): Observable<any> {
    let parametros = new HttpParams()
      .set('cantidadPag', cantidadPag.toString()) // Asegúrate de convertir a string
      .set('numPagina', numPagina.toString())
      .set('textoBusqueda', textoBusqueda || '');

    // Devuelve el resultado del HttpClient
    return this.httpCliente.get('http://localhost:56361/api/medico', { params: parametros });
  }

  Eliminar(ids: number[]){
    const option = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body : ids
    };
    return this.httpCliente.delete('http://localhost:56361/api/medico', option);
  }

  CrearMedico(datos: any): Observable<any> {
    return this.httpCliente.post('http://localhost:56361/api/medico', datos, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  ActualizarMedico(id: number, datos: any): Observable<any> {
    return this.httpCliente.put(`http://localhost:56361/api/medico/${id}`, datos, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  LeerTodoPaciente(cantidadPag: number, numPagina: number, textoBusqueda: string): Observable<any> {
    let parametros = new HttpParams()
      .set('cantidadPag', cantidadPag.toString()) // Asegúrate de convertir a string
      .set('numPagina', numPagina.toString())
      .set('textoBusqueda', textoBusqueda || '');

    // Devuelve el resultado del HttpClient
    return this.httpCliente.get('http://localhost:56361/api/paciente/', { params: parametros });
  }

  EliminarPaciente(ids: number[]){
    const option = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body : ids
    };
    return this.httpCliente.delete('http://localhost:56361/api/paciente', option);
  }

  CrearPaciente(datos: any): Observable<any> {
    return this.httpCliente.post('http://localhost:56361/api/paciente', datos, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  ActualizarPaciente(id: number, datos: any): Observable<any> {
    return this.httpCliente.put(`http://localhost:56361/api/paciente/${id}`, datos, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

}