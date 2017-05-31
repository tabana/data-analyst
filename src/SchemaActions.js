import AppDispatcher from './AppDispatcher';
import ActionType from './ActionType';

class SchemaActions {
    loadSchema(action) {
        AppDispatcher.handleViewAction({
            type: ActionType.LOAD_SCHEMA
            ,data: action
        });
    }

    schemaLoaded(action) {
        AppDispatcher.handleViewAction({
            type: ActionType.SCHEMA_LOADED
            ,data: action
        });
    }

    createSchema(action) {
        AppDispatcher.handleViewAction({
            type: ActionType.CREATE_SCHEMA
            ,data: action
        });
    }
    
    updateSchema(action) {
        AppDispatcher.handleViewAction({
            type: ActionType.UPDATE_SCHEMA_ROWS
            ,data: action
        });
    }

    deleteSchemaRows(action) {
        AppDispatcher.handleViewAction({
            type: ActionType.DELETE_SCHEMA_ROWS
            ,data: action
        });
    }

    addSchemaRow(action) {
        AppDispatcher.handleViewAction({
            type: ActionType.ADD_SCHEMA_ROW
            ,data: action
        })
    }
};

export default new SchemaActions();