import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTPService } from '../../../../services/http.service';
import { MaterialModule } from '../../../../material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-index',
  imports: [RouterModule, MaterialModule, MatFormFieldModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class IndexComponent implements OnInit{
  
  displayedColumns: string[] = ['cedula', 'nombre', 'esEspecialista', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  
  cantidadTotal = 0;
  cantidadPorPagina = 10;
  numeroDePagina = 0;
  opcionesDePaginado : number[] = [1 ,5 ,10 ,25, 100];

  textoBusqueda = '';


  constructor(
  private httpService: HTTPService
  ){
  }
  
  ngOnInit(): void {
    this.LeerTodo();
  }


  LeerTodo(){
    this.httpService.LeerTodo(this.cantidadPorPagina, this.numeroDePagina, this.textoBusqueda)
    .subscribe((respuesta: any) => {
      this.dataSource.data = respuesta.datos.elemento;
      this.cantidadTotal = respuesta.datos.cantidadTotal;
    });
  }
  
  cambiarPagina(event: any) {
    this.cantidadPorPagina = event.pageSize;
    this.numeroDePagina = event.pageIndex;
    this.LeerTodo();
  }

  eliminar(medicoId: number){
    let confirmacion = confirm('¿Estás seguro que desea Eliminar este elemento?');

    if(confirmacion){
      let ids = [medicoId];

      this.httpService.Eliminar(ids)
      .subscribe((respuesta: any) => {
        this.LeerTodo();
      });
    }
  }
}
