import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HTTPService } from '../../../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-index',
  imports: [MaterialModule, RouterModule, MatFormFieldModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{
  
    displayedColumns: string[] = ['cedula', 'nombre', 'direccion', 'celular', 'correoElectronico'];
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
      this.LeerTodoPaciente();
    }
  
  
    LeerTodoPaciente(){
      this.httpService.LeerTodoPaciente(this.cantidadPorPagina, this.numeroDePagina, this.textoBusqueda)
      .subscribe((respuesta: any) => {
        console.log('Datos recibidos:', respuesta.datos.elemento);
        this.dataSource.data = respuesta.datos.elemento;
        this.cantidadTotal = respuesta.datos.cantidadTotal;
      });
    }
    
    cambiarPagina(event: any) {
      this.cantidadPorPagina = event.pageSize;
      this.numeroDePagina = event.pageIndex;
      this.LeerTodoPaciente();
    }
  
    eliminar(pacienteId: number){
      let confirmacion = confirm('¿Estás seguro que desea Eliminar este elemento?');
  
      if(confirmacion){
        let ids = [pacienteId];
  
        this.httpService.Eliminar(ids)
        .subscribe((respuesta: any) => {
          this.toastr.success('Eliminado correctamente', 'Eliminado!')
          this.LeerTodoPaciente();
        });
      }
    }
  
    crearPaciente(){
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
          this.httpService.CrearPaciente(resultado).subscribe({
            next: () => {
              this.toastr.success('Paciente creado correctamente', 'Éxito');
              this.LeerTodoPaciente(); // Actualiza la tabla
            },
            error: () => {
              this.toastr.error('Error al crear el paciente', 'Error');
            },
          });
        }
      });
    }
  
    editarPaciente(paciente: any) {
      const dialogRef = this.dialog.open(FormComponent, {
        disableClose: true,
        autoFocus: true,
        closeOnNavigation: false,
        position: { top: '30px' },
        width: '700px',
        data: { tipo: 'EDITAR', paciente },
      });
    
      dialogRef.afterClosed().subscribe(resultado => {
        if (resultado) {
          this.httpService.ActualizarPaciente(paciente.id, resultado).subscribe({
            next: () => {
              this.toastr.success('Paciente actualizado correctamente', 'Éxito');
              this.LeerTodoPaciente(); // Actualiza la tabla
            },
            error: () => {
              this.toastr.error('Error al actualizar el médico', 'Error');
            },
          });
        }
      });
    }
  
    verPaciente(paciente: any) {
      this.dialog.open(FormComponent, {
        disableClose: true,
        autoFocus: true,
        closeOnNavigation: false,
        position: { top: '30px' },
        width: '700px',
        data: { tipo: 'VER', paciente },
      });
    }
  
}
