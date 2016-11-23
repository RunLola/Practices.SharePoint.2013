﻿/// <reference path="_references.js" />

// Require jQuery & jQuery UI
LoadSodByKey("jquery.ui.js", function () {
    // Require React & ReactDOM
    LoadSodByKey("react-dom.js", function () {
        // React Components
        var Grid = React.createClass({
            getInitialState: function () {
                return { data: [] };
            },
            componentDidMount: function () {
                $(ReactDOM.findDOMNode(this)).droppable({
                    accept: ".gridRow",
                    classes: {
                        "ui-droppable-active": "ui-state-highlight"
                    },
                    drop: function (event, ui) {
                        var $item = $(ui.draggable);
                        this.state.data.push({});
                        this.setState({ data: this.state.data });
                    }.bind(this)
                });
                $(ReactDOM.findDOMNode(this)).sortable({
                    revert: true,
                    placeholder: "ui-state-highlight"
                });
            },
            render: function () {
                //var gridRows = [];
                //_.each(this.state.data, function (gridRow) {
                //    gridRows.push(<GridRow />);
                //});
                var gridRows = this.state.data.map(function (gridRow) {
                    return (<GridRow />);
                });
                return (
                    <div className="form-horizontal">
                        {gridRows}
                    </div>
                );
            }
        });

        var GridRow = React.createClass({
            getInitialState: function () {
                return { data: [] };
            },
            componentDidMount: function () {
                $(ReactDOM.findDOMNode(this)).droppable({
                    accept: ".gridCol, .col-sm-12",
                    classes: {
                        "ui-droppable-active": "ui-state-highlight"
                    },
                    drop: function (event, ui) {
                        var $item = $(ui.draggable);                        
                        this.state.data.push({
                            Title: $item.hasClass("gridCol") ? $item.text() : $item.find("h3").text(),
                            InternalName: $item.hasClass("gridCol") ? $item.attr("id") : $item.find(".form-group").attr("id")
                        });
                        $item.remove();
                        this.setState({ data: this.state.data });                        
                    }.bind(this)
                });
                $(ReactDOM.findDOMNode(this)).sortable({
                    handle: '.col-sm-12',
                    revert: true,      
                    placeholder: "ui-state-highlight"
                });
            },
            render: function () {
                //var gridCols = [];
                //_.each(this.state.data, function (gridCol) {
                //    gridCols.push(<GridCol Title={ gridCol.Title } />);
                //});
                var gridCols = this.state.data.map(function (gridCol) {
                    return (<GridCol Title={ gridCol.Title} InternalName={ gridCol.InternalName } />);
                });
                return (
                    <div className="row">
                        {gridCols}
                    </div>
                );
            }
        });

        var GridCol = React.createClass({
            componentDidMount: function () {
                $(ReactDOM.findDOMNode(this)).draggable({
                    // when not dropped, the item will revert back to its initial position
                    revert: "invalid",
                    containment: "document",
                    helper: function () {
                        return $("<div class='form-group'></div>");
                    },
                    drag: function (e, t) {
                        t.helper.width(350).css("z-index", 1);
                    },
                    cursor: "move"
                });
            },
            render: function () {
                return (
                    <div className="col-sm-12 col-md-6">
                        <div id={ this.props.InternalName } className="form-group">
                            <label className="ms-formlabel control-label col-sm-2">
                                <h3 className="ms-standardheader">
                                    { this.props.Title }
                                </h3>
                            </label>
                            <div className="ms-formbody col-sm-10">
                                <input type="text" className="form-control" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                );
            }
        });

        $(".gridRow").draggable({
            //connectToSortable: ".container-fluid",
            revert: "invalid",
            containment: "document",
            helper: function () {
                return $("<div class='row'></div>");
            },
            drag: function (e, t) {
                t.helper.width(350).css("z-index", 1);
            },
            cursor: "move"
        });
        $(".gridCol").draggable({
            // when not dropped, the item will revert back to its initial position
            revert: "invalid",
            containment: "document",
            helper: function () {
                return $("<div class='form-group'></div>");
            },
            drag: function (e, t) {
                t.helper.width(350).css("z-index", 1);
            },
            cursor: "move"
        });
        ReactDOM.render(<Grid />, $(".container-fluid").get(0));
    })
});

function CollectData() {
    var layout = { ControlMode: 0, Rows: [] };
    var $rows = $(".form-horizontal").find(".row");
    $rows.each(function () {
        var row = [];
        var $cols = $(this).find(".form-group");
        $cols.each(function () {
            var col = {
                Title: $(this).find("h3").text(),
                InternalName: $(this).attr("id"),
                ClassName: $(this).parent().attr("class")
            };
            row.push(col);
        });
        layout.Rows.push(row);
    });
    $("input[id*='json'").val(JSON.stringify(layout));
}
//// Require jQuery & jQuery UI
//ExecuteOrDelayUntilScriptLoaded(function () {
//    // Require React & ReactDOM
//    ExecuteOrDelayUntilScriptLoaded(function () {
//    }, "react-dom.js");
//}, "jquery.ui.js");