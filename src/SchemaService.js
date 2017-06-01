import SchemaActions from './SchemaActions';
import Schema from './Schema';

const url = 'http://localhost:3579/transformation/schema';

class DataService {
    load(name) {
        fetch(url + '/' + name, { method: 'GET' })
        .then((response) => {
            response.json()
            .then((obj) => {
                if (obj.length > 0) {
                    let loadedRows = obj[0].entities.map((e) => [e.name, e.sqlType]);
                    let rows = new Schema(loadedRows);
                    SchemaActions.schemaLoaded({ name: name, rows: rows })
                }
            })
        });
    }

    sync(name, rows) {
        let schemas = JSON.stringify([{
                name: name
                , entities: rows.map((r) => { return { name: r[0], sqlType: r[1] } })
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
            this.load(name);
        })
    }
}

export default new DataService();
