Ext.define("NotesApp.view.Matchs.List", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.matchslistview",

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            title: "Matchs",
            docked: "top",
            items: [
                {
                    xtype:'spacer',
                    flex:1
                },
                {
                    xtype: "button",
                    text: '',
                    ui: 'confirm',
                    itemId: "newButton",
                    iconCls: 'add',
                    iconMask: true
                }/*, {
                    text: 'Theme Builder',
                    handler: function () {
                        //show theme builder
                        DEShowThemeBuilder(true);
                    }
                }, {
                    text: 'Hide Theme Builder',
                    handler: function () {
                        //hide theme builder
                        DEShowThemeBuilder(false);
                    }
                }*/
            ]
        }, {
            xtype: "list",
            store: "Matchs",
            itemId:"matchsList",
            loadingText: "Loading Matchs...",
            emptyText: "<div class=\"notes-list-empty-text\">No macths found.</div>",
            onItemDisclosure: true,
            grouped: true,
            itemTpl: "<img src='resources/images/ball.png' class='li-thumb' /><div class=\"list-item-title\">{title}</div><div class=\"list-item-date\">{dateMatch:date('d/m/Y à H:i')}</div><div class=\"list-item-desc\">{desc}</div>"
        }],
        listeners: [{
            delegate: "#newButton",
            event: "tap",
            fn: "onNewButtonTap"
        }, {
            delegate: "mainview",
            event: "select",
            fn: "onNewButtonTap"
        }, {
            delegate: "#matchsList",
            event: "disclose",
            fn: "onMatchsListDisclose"
        }, {
            delegate: "#matchsList",
            event: "select",
            fn: "onMatchsListDisclose"
        }]
    },    
    onNewButtonTap: function () {
        console.log("newMatchCommand");
        this.fireEvent("newMatchCommand", this);
    },
    onMatchsListDisclose: function (list, record, target, index, evt, options) {
        console.log("detailsMatchCommand");
        this.fireEvent('detailsMatchCommand', this, record);
    }
});