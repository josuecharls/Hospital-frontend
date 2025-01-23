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

  ngOnInit(): void{
    this.initForm();
  }

  cancelar(){
    this.dialogRef.close();
  }

  guardar(){

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
