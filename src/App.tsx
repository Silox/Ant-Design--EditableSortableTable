import * as React from "react";

import { Button, Checkbox, Col, Form, Icon, Input, Popconfirm, Row, Spin, Select, Table, Tooltip } from "antd";

class EditableTextCell extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            editable: this.props.editable
        };
    }

    private handleChange(e) {
        const { value } = e.target;
        this.props.handleChange(value);
    }

    public render() {
        const { value, editable } = this.props;

        return (
            <div>
                { editable ?
                    <div>
                        <Input
                            value={value}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    :
                    <div className="editable-row-text">
                        { value.toString() || " " }
                    </div>
                }
            </div>
        );
    }
}

export default class EditableSortableTable extends React.Component<any, any> {

    private columns;

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: "Title",
                dataIndex: "title",
                width: "40%",
                render: (text, record, index) => this.renderTextColumn(record, index, "title", text),
                sorter: (a, b) => a.title.localeCompare(b.title),
            },
            {
                title: "Actions",
                dataIndex: "actions",
                render: (text, record, index) => this.renderActionColumn(record),
            },
        ];

        this.state = {
            sourceData: [
                {
                    key: 1,
                    title: "C - Test",

                },
                {
                    key: 2,
                    title: "M - Test",

                },
                {
                    key: 3,
                    title: "X - Test",
                },
            ],
            isEditableMap: {}
        };
    }

    private renderActionColumn(record) {
        const editable = this.isEditable(record);

        return (
            <div className="editable-row-operations">
                {
                    editable ?
                        <span>
                            <a onClick={() => this.handleSave(record)}>Save</a>
                        </span>
                    :
                        <span>
                            <a onClick={() => this.handleEdit(record)}>Edit</a>
                        </span>
                }
            </div>
        );
    }

    private renderTextColumn(record, index, key, text) {
        const editable = this.isEditable(record);

       return (
           <EditableTextCell
                editable={editable}
                value={text}
                handleChange={value => this.handleChange(index, key, value)}
           />
       );
    }

    private isEditable(record) {
        return this.state.isEditableMap[record.key];
    }

    private setEditable(record) {
        const isEditableMap = Object.assign({}, this.state.editableMap);
        isEditableMap[record.key] = true;

        this.setState({ isEditableMap: isEditableMap });
    }

    private setNotEditable(record) {
        const isEditableMap = Object.assign({}, this.state.editableMap);
        delete isEditableMap[record.key];

        this.setState({ isEditableMap: isEditableMap });
    }

    private handleEdit(record) {
        this.setEditable(record);
    }

    private handleSave(record) {
        // Save to API
        // APIUtils.saveRecord(record);
        this.setNotEditable(record);
    }

    private handleChange(index, key, value) {
        const sourceData = this.state.sourceData.map(record => Object.assign({}, record));
        sourceData[index][key] = value;

        this.setState({
            sourceData: sourceData
        })
    }

    public render() {
        const { sourceData } = this.state;

        return (
            <div>
                <h1>Editable sortable table</h1>
                <Table
                    dataSource={sourceData}
                    columns={this.columns}
                />
            </div>
        );
    }
}