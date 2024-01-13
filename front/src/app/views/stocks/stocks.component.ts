import { Component } from '@angular/core';
import { IStock } from '../../Interfaces/istock';
import { StockService } from '../../Services/stock.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent {
  title = 'Stocks';
  stocks: IStock[];
  constructor(private stocksServicio: StockService) {}
  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.stocksServicio.todos().subscribe((listastock) => {
      this.stocks = listastock;
      console.log(listastock);
    });
  }
  alerta() {
    Swal.fire('productos', 'Mensaje en productos', 'success');
  }
  eliminar(stockId: number) {
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
        this.stocksServicio.eliminar(stockId).subscribe((datos) => {
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
