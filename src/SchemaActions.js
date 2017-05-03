import AppDispatcher from './AppDispatcher';
import ActionType from './ActionType';

const url = 'http://localhost:3579/transformation/schema/TdmlCalypso2';

class SchemaActions {
    getSchema() {
        fetch(url, { method: 'GET' })
        .then((response) => {
            response.json()
            .then((obj) => {
                let rows = obj[0].entities.map((e) => [e.name, e.sqlType]);
                AppDispatcher.handleViewAction({
					type: ActionType.REQUEST_SCHEMA
					,data: rows
				});
            })
        });
    }
    
    createSchema(action) {
        fetch(url, { method: 'POST', body: action })
        .then((response) => {
            AppDispatcher.handleViewAction({
                type: ActionType.CREATE_SCHEMA
                ,data: action
            })
        })
    }
    
    updateSchema(action) {
        fetch(url, { method: 'PUT', body: action })
        .then((response) => {
            AppDispatcher.handleViewAction({
                type: ActionType.UPDATE_SCHEMA
                ,data: action
            })
        })
    }
    
    deleteSchema(action) {
        fetch(url, { method: 'DELETE', body: action })
        .then((response) => {
            AppDispatcher.handleViewAction({
                type: ActionType.DELETE_SCHEMA
                ,data: action
            })
        })
    }
};

export default new SchemaActions();