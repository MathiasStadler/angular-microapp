import idb from 'idb';
//import * as idxdb from "./idb";
//import "./idb.js";

import { Driver } from './driver';
import { Adapter } from './adapter';
import { Database } from './database';



export class ProjectDriver {

  scope: ServiceWorkerGlobalScope;

  dbPromise :any;

  constructor(
    scope: ServiceWorkerGlobalScope, adapter: Adapter, db: Database) {

    // super(scope,adapter,db);

    this.scope = scope;


    this.dbPromise = idb.open('store', 1, function (db) {
      if (!db.objectStoreNames.contains('store')) {
        db.createObjectStore('store', {keyPath: 'id'});
      }
    });

    var item = [
      "key: 'istupid'",
      "name: 'sandwich'",
      "price: 4.99",
      "description: 'A very tasty sandwich'",
      "created: new Date().getTime()"
    ];

    //this.writeData('posts', item);

    this.writeData();

    this.scope.addEventListener('fetch', (event) => this.onFetch(event!));
    this.scope.addEventListener('message', (event) => this.onMessage(event !));
    this.scope.addEventListener('push', (event) => this.onPush(event !));

    // The install event is triggered when the service worker is first installed.
    this.scope.addEventListener('install', (event) => {
      // SW code updates are separate from application updates, so code updates are
      // almost as straightforward as restarting the SW. Because of this, it's always
      // safe to skip waiting until application tabs are closed, and activate the new
      // SW version immediately.
      // remark
      // event !.waitUntil(this.scope.skipWaiting());
      console.log("[ project driver ] install " , event);
    });

    // The activate event is triggered when this version of the service worker is
    // first activated.
    this.scope.addEventListener('activate', (event) => {
      // As above, it's safe to take over from existing clients immediately, since
      // the new SW version will continue to serve the old application.
      event !.waitUntil(this.scope.clients.claim());

      // Rather than wait for the first fetch event, which may not arrive until
      // the next time the application is loaded, the SW takes advantage of the
      // activation event to schedule initialization. However, if this were run
      // in the context of the 'activate' event, waitUntil() here would cause fetch
      // events to block until initialization completed. Thus, the SW does a
      // postMessage() to itself, to schedule a new event loop iteration with an
      // entirely separate event context. The SW will be kept alive by waitUntil()
      // within that separate context while initialization proceeds, while at the
      // same time the activation event is allowed to resolve and traffic starts
      // being served.
      if (this.scope.registration.active !== null) {
        this.scope.registration.active.postMessage({action: 'INITIALIZE'});
      }

      console.log("[ project driver ] activate ");
    });


  }

  private onFetch(event: FetchEvent): void {
    const req = event.request;

    console.log("[ project driver ] onFetch " ,req);

    console.log(JSON.stringify(req));

  }

  private onMessage(event: ExtendableMessageEvent): void {


    console.log("[ project driver ] onMessage ", event);
  }

  private onPush(event: PushEvent): void {


    console.log("[ project driver ] onPush ", event);
  }

   writeData_old(st:String, data :String[]) {
    return this.dbPromise
      .then(function(db:any) {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.put(data);
        return tx.complete;
      });
  }

writeData(){
console.log("[project driver] writeData");
  this.dbPromise.then(function(db:any) {
    var tx = db.transaction('store', 'readwrite');
    var store = tx.objectStore('store');
    var item = {
      id: 'aaa',
      key:'keykey',
      name: 'sandwich',
      price: 4.99,
      description: 'A very tasty sandwich',
      created: new Date().getTime()
    };
    store.add(item);
    return tx.complete;
  }).then(function() {
    console.log('added item to the store os!');
  });
}


}