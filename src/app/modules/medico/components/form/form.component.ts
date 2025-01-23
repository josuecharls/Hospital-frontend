import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [RouterModule, MaterialModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  // ! para no inicializar el objeto
  formGroup!: FormGroup;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm();
    if (this.data.tipo === 'VER' || this.data.tipo === 'EDITAR') {
      this.formGroup.patchValue({
        cedula: this.data.medico.cedula,
        nombre: this.data.medico.nombre,
        apellidoPaterno: this.data.medico.apellidoPaterno || '', // Manejo de null
        apellidoMaterno: this.data.medico.apellidoMaterno || '', // Manejo de null
        esEspecialista: this.data.medico.esEspecialista,
        habilitado: this.data.medico.habilitado,
      });
  
      if (this.data.tipo === 'VER') {
        this.formGroup.disable(); // Desactiva todos los campos para vista de solo lectura
      }
    }
  }

  cancelar(){
    this.dialogRef.close();
  }

  guardar(){
    if (this.formGroup.valid) {
      const datos = this.formGroup.getRawValue();
  
      // Llama al servicio HTTP para guardar los datos
      this.dialogRef.close(datos); // Envía los datos al cerrar el diálogo
    } else {
      this.dialogRef.close();
    }
  }

  initForm(){
    this.formGroup = this.fb.group({
      cedula: [{value: null, disabled: false}, [Validators.required]],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      apellidoPaterno: [{value: null, disabled: false}, [Validators.required]],
      apellidoMaterno: [{value: null, disabled: false}],
      esEspecialista: [{value: false, disabled: false}, [Validators.required]],
      habilitado : [{value: false, disabled: false}, [Validators.required]]
    });
  }

}
