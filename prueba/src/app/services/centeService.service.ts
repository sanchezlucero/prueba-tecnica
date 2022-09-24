import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BooksData } from '../interface/data';
@Injectable({
    providedIn: 'root',
})
export class CenterService {
    private dataBook = new BehaviorSubject<BooksData[]>([]);
    lServdataBookicio$ = this.dataBook.asObservable();
    sendingDataBook(arrayBook:BooksData[]){
        this.dataBook.next(arrayBook)
    }
}