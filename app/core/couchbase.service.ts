import {Couchbase} from 'nativescript-couchbase';

export class CouchbaseService {

    private database: any;
    private isInstantiated: boolean;

    public constructor() {
        if(!this.isInstantiated) {
            this.database = new Couchbase("customer-database");
            this.isInstantiated = true;
        }
    }

    getDatabase() {
        return this.database;
    }

}