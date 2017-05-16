import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ReactDataGrid from 'react-data-grid';
import ButtonFormatter from './ButtonFormatter'
import SchemaStore from './SchemaStore';
import SchemaActions from './SchemaActions';

class SchemaView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //rows: [[]]
      selectedIndexes: []
    }

    this.handleRowsSelected = this.handleRowsSelected.bind(this);
    this.handleRowsDeselected = this.handleRowsDeselected.bind(this);
    this.updateState = this.updateState.bind(this);
    SchemaStore.fetchSchema(this.props.name);
  }

  componentWillMount() {
    SchemaStore.registerListener(this.updateState);
  }

  componentDidMount() {
    SchemaStore.fetchSchema(this.props.name);
  }

  componentWillUnmount() {
    SchemaStore.deregisterListener(this.updateState);
  }

  updateState() {
    let schema = SchemaStore.getSchema(this.props.name);
    this.setState({
      rows: schema.rows
    })
  }

  rowGetter(i) {
    return this.state.rows[i];
  }
  
  handleGridRowsUpdated({ fromRow, toRow, update }) {
    SchemaActions.updateSchema({ name: this.props.name, fromRowIndex: fromRow, toRowIndex: toRow, update: update });
  }

  handleGridDeleteButtonClicked(element, deletedRowIndex) {
    SchemaActions.deleteSchemaRow({ name: this.props.name, deletedRowIndex: deletedRowIndex });
  }

  handleRowsSelected(rows) {
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
  }

  handleRowsDeselected(rows) {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  }

  render() {
    if (this.state.rows) {
      let columns = [
          { key: 'name', name: 'Name', editable: true, resizable: true }
          ,{ key: 'sqlType', name: 'Type', editable: true, resizable: true }
          ,{ key: 'deleteButton', name: '', formatter:ButtonFormatter, resizable: true }
      ]

      let rows = this.state.rows.map(
        (r, i) => ({
          name: r[0],
          sqlType: r[1],
          deleteButton: {
           rowIndex: i,
           text: 'delete',
           clickHandler: (e, ri) => this.handleGridDeleteButtonClicked(e, i)
          }
        })
      );
      
      return (
        <Grid>
          <Row className="show-grid">
            <Col>
              <ReactDataGrid
                enableCellSelect={true}
                onGridRowsUpdated={this.handleGridRowsUpdated}
                columns={columns}
                rowGetter={(i) => {return rows[i]}}
                rowsCount={rows.length}
                minHeight={500}
                rowSelection={{
                  showCheckbox: true,
                  enableShiftSelect: true,
                  onRowsSelected: this.handleRowsSelected,
                  onRowsDeselected: this.handleRowsDeselected,
                  selectBy: {
                    indexes: this.state.selectedIndexes
                  }
                }} />
              </Col>
            </Row>
            <Row className="show-grid">
              <Col>
              </Col>
            </Row>
          </Grid>
      );
    } else {
      return null;
    }
  }
}

export default SchemaView;
