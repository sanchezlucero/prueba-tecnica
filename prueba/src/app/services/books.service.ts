import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Books } from '../interface/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(){
    const path='https://apis-prueba.pruebasgt.com/api/products'
    return this.http.get<Books>(path)
  }
}
