Ext.define("NotesApp.model.Joueur", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'internalId',
        fields: [
            { name: 'id', type: 'string' },
            { name: 'dateCreated', type: 'date', dateFormat: 'c' },
            { name: 'dateBirth', type: 'date', dateFormat: 'c' },
            { name: 'nom', type: 'string' },
            { name: 'prenom', type: 'string' },
            { name: 'desc', type: 'string' },
            { name: 'dateVoulu', type: 'date', dateFormat: 'c' }
        ],
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'nom', message: 'Please enter a nom.' },
            { type: 'presence', field: 'prenom', message: 'Please enter a prenom.' },
            { type: 'presence', field: 'dateVoulu', message: 'Please enter a date.' },
            { type: 'presence', field: 'dateCreated' }
        ]
    }
});