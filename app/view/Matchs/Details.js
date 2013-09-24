Ext.define("NotesApp.view.Matchs.Details", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.matchsdetailsview",

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
        tpl: ['<img src="resources/images/ball.png" />',
            '<h2>Name: {title}</h2>',
            '<h3>Description : {desc}</h3>',
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
        console.log("editMatchCommand");
        this.fireEvent("editMatchCommand", this, this.getRecord());
    },
    onBackButtonTap: function() {
        console.log("backToHomeCommand");
        this.fireEvent("backToHomeCommand", this);
    }
});