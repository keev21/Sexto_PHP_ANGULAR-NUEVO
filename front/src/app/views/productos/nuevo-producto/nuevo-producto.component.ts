import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductosService} from '../../../Services/producto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css',
})
export class NuevoProductoComponent {
  title = '';
  id!: number;

  producto: FormGroup = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Precio: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(1),
    ]),
    Cantidad: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(1),
    ]),
   
   
  });
  constructor(
    private productoServicio: ProductosService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Proveedor';
    } else {
      this.title = 'Actualizar Proveedor';
      this.productoServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.producto.patchValue({
          Nombre: res.Nombre,
          Precio: res.Precio,
          Cantidad: res.Cantidad,
          
        });
      });
    }
  }
  get f() {
    return this.producto.controls;
  }

  grabar() {
    Swal.fire({
      title: 'Proveedores',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.productoServicio
            .insertar(this.producto.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'Proveedores',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/productos']);
              this.id = 0;
            });
        } else {
          this.productoServicio
            .actualizar(this.producto.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Proveedores',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/productos']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Proveedores',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }

}
