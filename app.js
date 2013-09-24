Ext.Loader.setConfig({
    disableCaching: false
});

Ext.Loader.setPath({
    //'Ext': 'touch/src',
    'Ext.ux': './ux'
});

Ext.application({
    name: "NotesApp",

    models: ["Match", "Joueur"],
    stores: ["Matchs", "Joueurs"],
    controllers: ["Main", "Matchs", "Joueurs"],
    views: ["Main", "Matchs.List", "Matchs.Details", "Matchs.Editor", "Joueurs.List", "Joueurs.Details", "Joueurs.Editor"],

    launch: function () {
        // Destroy the #appLoadingIndicator element
        Ext.fly('loading-div').destroy();
        /*var notesListView = {
            xtype: "noteslistview"
        };
        var noteEditorView = {
            xtype: "noteeditorview"
        };*/
        var main = {
            xtype: "mainview"
        };

        Ext.Viewport.add(main);

    },

    onUpdated: function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function () {
                window.location.reload();
            }
        );
    }
});