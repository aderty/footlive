Ext.define("NotesApp.view.Joueurs.Details", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.joueurdetailsview",

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            title: "Détails",
            docked: "top",
            items: [
                {
                        xtype: "button",
                        ui: "back",
                        text: "",
                        itemId: "backButton",
                        iconCls: 'reply',
                        iconMask: true
                },
                { xtype: "spacer" } ,
                {
                    xtype: "button",
                    text: '',
                    ui: 'action',
                    itemId: "editButton",
                    iconCls: 'compose',
                    iconMask: true
                }
            ]
        }],
        tpl: ['<img src="resources/images/user.png" />',
            '<h2>Name: {nom}</h2>',
            '<h3>Description : {prenom}</h3>',
            '<a class="call" href="tel:06000000">Appeler</a>'],
        listeners: [{
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTap"
            },{
            delegate: "#editButton",
            event: "tap",
            fn: "onEditButtonTap"
        }]
    },
    onEditButtonTap: function() {
        console.log("editJoueurCommand");
        this.fireEvent("editJoueurCommand", this, this.getRecord());
    },
    onBackButtonTap: function() {
        console.log("backToHomeCommand");
        this.fireEvent("backToHomeCommand", this);
    }
});