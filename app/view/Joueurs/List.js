Ext.define("NotesApp.view.Joueurs.List", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.joueurslistview",

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            title: "Joueurs",
            docked: "top",
            items: [
                { xtype: 'spacer' },
                {
                    xtype: "button",
                    text: 'New',
                    ui: 'action',
                    itemId: "newJoueurButton"
                }
            ]
        }, {
            xtype: "list",
            store: "Joueurs",
            itemId: "joueursList",
            loadingText: "Loading Joueurs...",
            emptyText: "<div class=\"notes-list-empty-text\">No joueurs found.</div>",
            onItemDisclosure: true,
            grouped: true,
            itemTpl: "<img src='resources/images/user.png' class='li-thumb' /><div class=\"list-item-title\">{id}</div><div class=\"list-item-desc\">{nom} {prenom}</div>"
        }],
        listeners: [{
            delegate: "#newJoueurButton",
            event: "tap",
            fn: "onNewJoueurButtonTap"
        }, {
            delegate: "#joueursList",
            event: "disclose",
            fn: "onJoueursListDisclose"
        },
        {
            delegate: "#joueursList",
            event: "select",
            fn: "onJoueursListDisclose"
        }]
    },    
    onNewJoueurButtonTap: function () {
        console.log("newJoueurCommand");
        this.fireEvent("newJoueurCommand", this);
    },
    onJoueursListDisclose: function (list, record, target, index, evt, options) {
        console.log("detailsJoueurCommand");
        this.fireEvent('detailsJoueurCommand', this, record);
    }
});