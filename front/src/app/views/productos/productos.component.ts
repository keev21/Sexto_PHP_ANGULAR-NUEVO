import { Component } from '@angular/core';
import { IProducto } from '../../Interfaces/iproducto';
import { ProductosService } from '../../Services/producto.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {

  title = 'Producto';
  productos: IProducto[];
  constructor(private productosServicio: ProductosService) {}
  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.productosServicio.todos().subscribe((listaproductos) => {
      this.productos = listaproductos;
      console.log(listaproductos);
    });
  }
  alerta() {
    Swal.fire('productos', 'Mensaje en productos', 'success');
  }
  eliminar(productoId: number) {
    Swal.fire({
      title: 'productos',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosServicio.eliminar(productoId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'productos',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'productos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
  
}
