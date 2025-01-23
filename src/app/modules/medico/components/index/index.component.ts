import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTPService } from '../../../../services/http.service';
import { MaterialModule } from '../../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';


@Component({
  selector: 'app-index',
  imports: [RouterModule, MaterialModule, MatFormFieldModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],

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
  private httpService: HTTPService,
  private toastr: ToastrService,
  public dialog: MatDialog
  ){
  }
  
  ngOnInit(): void {
    this.LeerTodo();
  }


  LeerTodo(){
    this.httpService.LeerTodo(this.cantidadPorPagina, this.numeroDePagina, this.textoBusqueda)
    .subscribe((respuesta: any) => {
      console.log('Datos recibidos:', respuesta.datos.elemento);
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
        this.toastr.success('Eliminado correctamente', 'Eliminado!')
        this.LeerTodo();
      });
    }
  }

  crearMedico(){
    const dialogRef = this.dialog.open(FormComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px'},
      width: '700px',
      data: {
        tipo: 'CREAR'
      },
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.httpService.CrearMedico(resultado).subscribe({
          next: () => {
            this.toastr.success('Médico creado correctamente', 'Éxito');
            this.LeerTodo(); // Actualiza la tabla
          },
          error: () => {
            this.toastr.error('Error al crear el médico', 'Error');
          },
        });
      }
    });
  }

  editarMedico(medico: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '700px',
      data: { tipo: 'EDITAR', medico },
    });
  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.httpService.ActualizarMedico(medico.id, resultado).subscribe({
          next: () => {
            this.toastr.success('Médico actualizado correctamente', 'Éxito');
            this.LeerTodo(); // Actualiza la tabla
          },
          error: () => {
            this.toastr.error('Error al actualizar el médico', 'Error');
          },
        });
      }
    });
  }

  verMedico(medico: any) {
    this.dialog.open(FormComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '700px',
      data: { tipo: 'VER', medico },
    });
  }

}
