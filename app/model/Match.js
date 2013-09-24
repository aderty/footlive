Ext.define("NotesApp.model.Match", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'dateCreated', type: 'date', dateFormat: 'c' },
            { name: 'dateMatch', type: 'date', dateFormat: 'c' },
            { name: 'title', type: 'string' },
            { name: 'desc', type: 'string' },
            { name: 'nb', type: 'int'},
            { name: 'owner', type: 'string'}
        ],
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'title', message: 'Please enter a title for this match.' },
            { type: 'presence', field: 'dateMatch', message: 'Please enter a date for this match.' },
            { type: 'presence', field: 'dateCreated' }
        ]
    }
});