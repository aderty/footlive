Ext.define("NotesApp.store.Matchs", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "NotesApp.model.Match",
        proxy: {
            type: 'localstorage',
            id: 'matchs-app-store'
        },
        //autoLoad: true,
        sorters: [{ property: 'dateMatch', direction: 'DESC' }],
        grouper: {
            sortProperty: "dateMatch",
            direction: "DESC",
            groupFn: function (record) {

                if (record && record.data.dateMatch) {
                    return record.data.dateMatch.toDateString();
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
