import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BooksData } from '../interface/data';
import { CenterService } from '../services/centeService.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  nombre = '';
  descripcion = '';
  precio = 0;

  constructor(private centerService: CenterService, public _MatDialog: MatDialogRef<ListBooksComponent>,

  ) { }

  ngOnInit(): void {
    this.centerService.lServdataBookicio$.subscribe((myData) => {
      console.log(myData)
      myData.forEach((listBook) => {
        this.nombre = listBook.name;
        this.descripcion = listBook.description;
        this.precio = listBook.price;
      })
    })
  }
  salir() {
    this._MatDialog.close();
  }
  actualizar() {
    console.log("nombre ", this.nombre)

    /*  entityBook.name = this.nombre;
     entityBook.description = this.descripcion;
     entityBook.price = this.precio; */


    Swal.fire({
      title: 'Actualizado Correctamente',
      icon: 'success',
      text: 'Se ha actualizado libro',
      confirmButtonText: 'Ok',

    })
    this.salir();
  }
}
