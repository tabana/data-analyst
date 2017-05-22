import AppDispatcher from './AppDispatcher';
import ActionType from './ActionType';

class SchemaActions {   
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