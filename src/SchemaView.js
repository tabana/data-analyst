import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ReactDataGrid from 'react-data-grid';
import ButtonFormatter from './ButtonFormatter'
import SchemaStore from './SchemaStore';
import SchemaActions from './SchemaActions';
import './Button.css';

class SchemaView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
          { key: 'name', name: 'Name', editable: true, resizable: true }
          ,{ key: 'sqlType', name: 'Type', editable: true, resizable: true }
          ,{ key: 'deleteButton', name: '', width: 80, formatter: ButtonFormatter }
      ],
      selectedIndexes: []
    }

    this.updateState = this.updateState.bind(this);
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

  updateState(name) {
    if (name === this.props.name) {
      let schema = SchemaStore.getSchema(this.props.name);

      this.setState({
        rows: schema.rows
      })
    }
  }

  rowGetter(i) {
    return this.state.rows[i];
  }
  
  handleGridRowsUpdated(update) {
    let column = this.state.columns.findIndex((e, i, a) => e.key === update.cellKey);
    let value = update.updated[update.cellKey];
    
    SchemaActions.updateSchema({
      name: this.props.name
      ,fromRowIndex: update.fromRow
      ,toRowIndex: update.toRow
      ,columnIndex: column
      ,value: value });
  }

  handleGridDeleteButtonClicked(element, deletedRowIndex) {
    SchemaActions.deleteSchemaRows({ name: this.props.name, deletedRowIndexes: [deletedRowIndex] });
  }

  handleDeleteButtonClicked(element) {
    SchemaActions.deleteSchemaRows({ name: this.props.name, deletedRowIndexes: this.state.selectedIndexes });
  }

  handleAddButtonClicked() {
    SchemaActions.addSchemaRow({ name: this.props.name });
  }

  handleRowsSelected(rows) {
    this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) });
  }

  handleRowsDeselected(rows) {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 ) });
  }

  render() {
    if (this.state.rows) {
      let columns = this.state.columns;

      let rows = this.state.rows.map(
        (r, i) => ({
          name: r[0]
          ,sqlType: r[1]
          ,deleteButton: {
           text: 'delete'
           ,clickHandler: (e, ri) => this.handleGridDeleteButtonClicked(e, i)
          }
        })
      );
      
      return (
        <Grid>
          <Row className="show-grid">
            <Col>
              <ReactDataGrid
                enableCellSelect={ true }
                onGridRowsUpdated={ (u) => this.handleGridRowsUpdated(u) }
                columns={ columns }
                rowGetter={ (i) => { return rows[i] } }
                rowsCount={ rows.length }
                minHeight={ 500 }
                rowSelection={ {
                  showCheckbox: true,
                  enableShiftSelect: true,
                  onRowsSelected: (r) => this.handleRowsSelected(r),
                  onRowsDeselected: (r) => this.handleRowsDeselected(r),
                  selectBy: { indexes: this.state.selectedIndexes }
                } }
              />
             </Col>
            </Row>
            <Row className="show-grid">
              <Col>
                <button className='button independentButton' onClick={ () => this.handleAddButtonClicked() }>
                  Add
                </button>
                <button className='button independentButton' onClick={ () => this.handleDeleteButtonClicked() }>
                  Delete
                </button>
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
