import EventEmitter from 'events';
import AppDispatcher from './AppDispatcher';
import ActionType from './ActionType';
import SchemaService from './SchemaService';

let CHANGE_EVENT = 'change';

let schemaData = [];

class SchemaStore extends EventEmitter {
    getSchema(name) {
        return schemaData[name];
    }

    create(name) {
        let rows = schemaData[name].rows;
        rows.push(['', '']);
        schemaData[name] = SchemaService.sync(name, rows);
    }

    add(name) {
        let rows = schemaData[name].rows;
        rows.push(['', '']);
        schemaData[name] = SchemaService.sync(name, rows);
    }

    remove(name, deletedRowIndexes) {
        let rows = schemaData[name].rows;

        for (let index of deletedRowIndexes) {
            rows.splice(index, 1);
        }
        
        schemaData[name] = SchemaService.sync(name, rows);
    }

    modify(name, fromRowIndex, toRowIndex, columnIndex, value) {
        let rows = schemaData[name].rows;

        for (let i = fromRowIndex; i <= toRowIndex; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = rowToUpdate.slice();
            updatedRow[columnIndex] = value;
            rows[i] = updatedRow;
        }

        schemaData[name] = SchemaService.sync(name, rows);
    }

    constructor() {
        super();

        AppDispatcher.register(
            (dispatch) => {
                switch(dispatch.action.type) {
                    case ActionType.LOAD_SCHEMA:
                        SchemaService.load(dispatch.action.data.name);
                        break;
                    case ActionType.SCHEMA_LOADED:
                        schemaData[dispatch.action.data.name] = dispatch.action.data.rows;
                        this.emit(CHANGE_EVENT, dispatch.action.data.name);
                        break;
                    case ActionType.CREATE_SCHEMA:
                        this.add(dispatch.action.data.name); 
                        break;
                    case ActionType.UPDATE_SCHEMA_ROWS:
                        this.modify(
                            dispatch.action.data.name
                            ,dispatch.action.data.fromRowIndex
                            ,dispatch.action.data.toRowIndex
                            ,dispatch.action.data.columnIndex
                            ,dispatch.action.data.value);
                        break;
                    case ActionType.DELETE_SCHEMA_ROWS:
                        this.remove(
                            dispatch.action.data.name
                            ,dispatch.action.data.deletedRowIndexes);
                        break;
                    case ActionType.ADD_SCHEMA_ROW:
                        this.add(dispatch.action.data.name); 
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
