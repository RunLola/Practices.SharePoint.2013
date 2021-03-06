﻿$('#orgTree').tree({
    dataSource: new DataSourceTree({
        url: "/_vti_bin/CorporateCatalog.svc/Categories/00000000-0000-0000-0000-000000000000/00000000-0000-0000-0000-000000000000"
    }),
    multiSelect: false,
    loadingHTML: '<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
    'open-icon': 'icon-minus',
    'close-icon': 'icon-plus',
    'selectable': true,
    'selected-icon': 'icon-ok',
    'unselected-icon': 'icon-remove'
});

var DataSourceTree = function (options) {
    this.url = options.url;
}

DataSourceTree.prototype.data = function (options, callback) {
    var self = this;
    var $data = null;
    var param = null;
    if (!("name" in options) && !("type" in options)) {
        param = 0;//load the first level  
    }
    else if ("type" in options && options.type == "folder") {
        if ("additionalParameters" in options && "children" in options.additionalParameters) {
            param = options.additionalParameters["id"];
        }
    }
    if (param != null) {
        $.ajax({
            url: this.url,
            data: 'id=' + param,
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.status == "OK")
                    callback({ data: response.data })
            },
            error: function (response) {
                console.log(response);
            }
        })
    }
};