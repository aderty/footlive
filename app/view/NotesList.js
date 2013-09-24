Ext.define("NotesApp.view.NotesList", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.noteslistview",

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
                    text: 'New',
                    ui: 'action',
                    itemId: "newButton"
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
            itemId:"notesList",
            loadingText: "Loading Matchs...",
            emptyText: "<div class=\"notes-list-empty-text\">No macths found.</div>",
            onItemDisclosure: true,
            grouped: true,
            itemTpl: "<img src='resources/images/ball.png' class='li-thumb' /><div class=\"list-item-title\">{title}</div><div class=\"list-item-date\">{dateMatch:date('d/m/Y')}</div><div class=\"list-item-desc\">{desc}</div>"
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
            delegate: "#notesList",
            event: "disclose",
            fn: "onNotesListDisclose"
        }, {
            delegate: "#notesList",
            event: "select",
            fn: "onNotesListDisclose"
        }]
    },    
    onNewButtonTap: function () {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    }
});