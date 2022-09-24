import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper, MatStepperNext } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Books } from './interface/books';
import { BooksData } from './interface/data';
import { ListBooksComponent } from './list-books/list-books.component';
import { BooksService } from './services/books.service';
import { CenterService } from './services/centeService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  title = 'Libros interesantes';
  displayedColumns: string[] = ['id', 'name', 'sku', 'price', 'acciones'];
  //dataSource = ELEMENT_DATA;
  dataSource: any;
  data: any;
  entityBooks: any;
  arrayBooks: any[] = [];
  arrayEditBooks: any[] = [];
  cantidad = 1;
  nombreClient='';
  direccion='';
  constructor(private booksService: BooksService, private _formBuilder: FormBuilder,
    private centerService: CenterService, public dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks() {
    this.booksService.getBooks().subscribe(dataX => {

      this.data = dataX.data;
      dataX.data.forEach((myData) => {
        console.log(myData.image)
      })
      this.dataSource = new MatTableDataSource<Books>(this.data);
    })
  }
  addBook(item: BooksData, stepper: MatStepper) {

    Swal.fire({
      title: '',
      icon: 'warning',
      text: '¿Está seguro que desea agregar al carrito de compras?',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.cantidad)

        this.entityBooks = item;

        this.arrayBooks.push(this.entityBooks);
        for (let i = 0; i < this.arrayBooks.length; i++) {
          this.arrayBooks[i].description = this.arrayBooks[i].description.slice(0, 60) + "..."
        }
        console.log(this.entityBooks);
        stepper.next();
      } else if (result.isDenied) {

      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editBook(item: any) {
    console.log(item)
    this.dialog.open(ListBooksComponent, {
      width: '30em'
    });
    this.arrayEditBooks.push(item)
    this.centerService.sendingDataBook(this.arrayEditBooks)
  }
  next(stepper: MatStepper) {
    console.log(this.arrayBooks.length)
    if (this.arrayBooks.length != 0) {
      stepper.next();

    } else {
      Swal.fire({
        title: 'Advertencia',
        icon: 'info',
        text: 'Debe agregar un libro',

        confirmButtonText: 'Ok',

      })
    }
  }
  finalizar(){
    Swal.fire({
      title: 'Gracias por su Compra '+this.nombreClient,
      icon: 'success',
      text: 'Se enviará a la dirección: '+this.direccion,

      confirmButtonText: 'Ok',

    })
  }
}
