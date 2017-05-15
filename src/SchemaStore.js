import React from 'react';
import EventEmitter from 'events';
import AppDispatcher from './AppDispatcher';
import ActionType from './ActionType';

let CHANGE_EVENT = 'change';

let schemaData = [];

class schema {
    constructor(rows) {
        this.headers = ['Name', 'Type'];
        this.rows = rows;
    }
}

const url = 'http://localhost:3579/transformation/schema';

class SchemaStore extends EventEmitter {
    getSchema(name)
    {
        return schemaData[name];
    }

    fetchSchema(name) {
        fetch(url + '/' + name, { method: 'GET' })
        .then((response) => {
            response.json()
            .then((obj) => {
                if (obj.length > 0) {
                    let rows = obj[0].entities.map((e) => [e.name, e.sqlType]);
                    schemaData[name] = new schema(rows);
                    this.emit(CHANGE_EVENT);
                }
            })
        });
    }

    create(name, newRows) {
        let rows = schemaData[name].rows.push(newRows);
        this.sync(name, rows);
    }

    add(name, row) {
        let rows = schemaData[name].rows.push(row);
        this.sync(name, rows);
    }

    remove(name, deletedRowIndex) {
        let rows = schemaData[name].rows.splice(deletedRowIndex, 1);
        this.sync(name, rows);
    }

    modify(name, fromRowIndex, toRowIndex, update) {
        let rows = schemaData[name].rows;

        for (let i = fromRowIndex; i <= toRowIndex; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = React.addons.update(rowToUpdate, { $merge: update });
            rows[i] = updatedRow;
        }

        this.sync(name, rows);
    }

    sync(name, rows) {
        let schemas = JSON.stringify([
            {
                name: name
                ,entities: rows.map((r) => {return { name: r[0], sqlType: r[1]}})
            }
        ]);

        fetch(
            url
            ,{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                , method: 'POST'
                , body:schemas
            }
        )
        .then((response) => {
            this.emit('update');
        })
    }

    constructor() {
        super();

        AppDispatcher.register(
            (dispatch) =>
            {
                switch(dispatch.action.type) {
                    case ActionType.CREATE_SCHEMA:
                        this.add(dispatch.action.data); 
                        break;
                    case ActionType.UPDATE_SCHEMA:
                        this.modify(dispatch.action.data.name, dispatch.action.data.fromRowIndex, dispatch.action.data.toRowIndex, dispatch.action.data.updatedRows);
                        break;
                    case ActionType.DELETE_SCHEMA:
                        this.remove(dispatch.action.data.name, dispatch.action.data.deletedRowIndex);
                        break;
                    default:
                        return true;
                }

                this.emit(CHANGE_EVENT);
                return true;
            }
        );
    }


    registerListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    deregisterListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

export default new SchemaStore();
