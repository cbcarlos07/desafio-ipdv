import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  notifier      = new EventEmitter()
  constructor() { }

  notify( obj ){
    this.notifier.emit( obj )
  }

}
