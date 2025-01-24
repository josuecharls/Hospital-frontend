import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
        cedula: this.data.paciente.cedula,
        nombre: this.data.paciente.nombre,
        apellidoPaterno: this.data.paciente.apellidoPaterno || '', // Manejo de null
        apellidoMaterno: this.data.paciente.apellidoMaterno || '', // Manejo de null
        direccion: this.data.paciente.direccion,
        celular: this.data.paciente.celular,
        correoElectronico: this.data.paciente.numero,

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
      direccion: [{value: null, disabled: false}, [Validators.required]],
      celular : [{value: null, disabled: false}, [Validators.required]],
      correoElectronico : [{value: null, disabled: false}, [Validators.required]],
    });
  }

}
