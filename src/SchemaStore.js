import EventEmitter from 'events';
import AppDispatcher from './AppDispatcher';
import ActionType from './ActionType';

let CHANGE_EVENT = 'change';

let schemaData = {
    headers: ['Name', 'Type']
}

class SchemaStore extends EventEmitter {
    get() {
        return schemaData;
    }

    add(row) {
        schemaData.rows.push(row);
    }

    remove(index) {
        schemaData.rows.splice(index, 1);
    }

    modify(index, row) {
        this.remove(index);
        this.add(row);
    }

    constructor() {
        super();

        AppDispatcher.register(
            (dispatch) =>
            {
                switch(dispatch.action.type) {
                    case ActionType.RECEIVE_SCHEMA:
                        schemaData.rows = dispatch.action.data
                        break;
                    case ActionType.CREATE_SCHEMA:
                        this.add(dispatch.action.data); 
                        break;
                    case ActionType.UPDATE_SCHEMA:
                        this.modify(dispatch.action.data);
                        break;
                    case ActionType.DELETE_SCHEMA:
                        this.remove(dispatch.action.data);
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
