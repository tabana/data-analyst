import AppDispatcher from './AppDispatcher';
import ActionType from './ActionType';

class SchemaActions {
    getSchema() {
        let url = 'http://localhost:3579/transformation/schema/TdmlCalypso2';
        fetch(url, { method: 'GET' })
        .then((response) => {
            response.json()
            .then((obj) => {
                let rows = obj[0].entities.map((e) => [e.name, e.sqlType]);
                AppDispatcher.handleViewAction({
					type: ActionType.RECEIVE_SCHEMA
					,data: rows
				});
            })
        });
    }
    
    createSchema(action) {
        AppDispatcher.handleViewAction({
            type: ActionType.CREATE_SCHEMA
            ,data: action
        })
    }
    
    updateSchema(action) {
        AppDispatcher.handleViewAction({
            type: ActionType.UPDATE_SCHEMA
            ,data: action
        })
    }
    
    deleteSchema(action) {
        AppDispatcher.handleViewAction({
            type: ActionType.DELETE_SCHEMA
            ,data: action
        })
    }
};

export default new SchemaActions();