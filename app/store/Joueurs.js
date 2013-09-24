Ext.define("NotesApp.store.Joueurs", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "NotesApp.model.Joueur",
        proxy: {
            type: 'localstorage',
            id: 'joueurs-app-store'
        },
        //autoLoad: true,
        sorters: [{ property: 'id', direction: 'DESC' }],
        grouper: {
            sortProperty: "id",
            direction: "DESC",
            groupFn: function (record) {

                if (record && record.data.id) {
                    return record.data.id.substring(0, 1);
                } else {
                    return '';
                }
            }
        }/*,
        data: [
            [1, new Date(), new Date(), 'Match 1', 'Type de martch', 10, 'toto'],
            { id: 2, dateCreated: new Date(), dateMatch: new Date(), title: 'Match 2', desc: 'Type de martch fdgfg', nb: 8, owner: 'toto' },
            { id: 3, dateCreated: new Date(), dateMatch: new Date(), title: 'Match 3', desc: 'Type de martch ds poza', nb: 9, owner: 'toto' }
        ]*/
    }
});
