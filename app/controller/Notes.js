Ext.define("NotesApp.controller.Notes", {

    extend: "Ext.app.Controller",
    requires:['Ext.MessageBox'],
    config: {
        refs: {
            main: {
                selector: 'mainview',
                xtype: 'mainview',
                autoCreate: true
            },
            // We're going to lookup our views by xtype.
            notesListView: {
                selector: 'noteslistview',
                xtype: 'noteslistview',
                autoCreate: true
            },//"noteslistview",
            noteEditorView: {
                selector: 'noteeditorview',
                xtype: 'noteeditorview',
                autoCreate: true
            },//"noteeditorview",
            notesList: "#notesList"
        },
        control: {
            main: {
                select: "onMenuSelect",
                newNoteCommand: "onNewNoteCommand",
                backToHomeCommand: "onBackToHomeCommand"
            },
            notesListView: {
                // The commands fired by the notes list container.
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand"
            },
            noteEditorView: {
                // The commands fired by the note editor.
                saveNoteCommand: "onSaveNoteCommand",
                deleteNoteCommand: "onDeleteNoteCommand",
                backToHomeCommand: "onBackToHomeCommand"
            }

        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    // Helper functions
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateNoteEditor: function (record) {
        this.getMain().setListItem(1);
        var noteEditorView = this.getNoteEditorView();
        noteEditorView.setRecord(record); // load() is deprecated.
        //Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
        this.getMain().setContainerItem(this.getMain(), noteEditorView, this.slideLeftTransition);
    },
    activateNotesList: function () {
        this.getMain().setListItem(0);
        //Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
        this.getMain().setContainerItem(this.getMain(), this.getNotesListView(), this.slideRightTransition);
    },

    // Commands.
    onNewNoteCommand: function () {

        console.log("onNewNoteCommand");

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create("NotesApp.model.Note", {
            id: noteId,
            dateCreated: now,
            title: "",
            narrative: ""
        });

        this.activateNoteEditor(newNote);

    },
    onEditNoteCommand: function (list, record) {

        console.log("onEditNoteCommand");

        this.activateNoteEditor(record);
    },
    onSaveNoteCommand: function () {

        console.log("onSaveNoteCommand");

        var noteEditorView = this.getNoteEditorView();

        var currentNote = noteEditorView.getRecord();
        var newValues = noteEditorView.getValues();

        // Update the current note's fields with form values.
        currentNote.set("title", newValues.title);
        currentNote.set("narrative", newValues.narrative);

        var errors = currentNote.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            currentNote.reject();
            return;
        }

        var notesStore = Ext.getStore("Notes");

        if (null == notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }

        notesStore.sync();

        notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

        this.activateNotesList();
    },
    onDeleteNoteCommand: function () {

        console.log("onDeleteNoteCommand");

        var noteEditorView = this.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var notesStore = Ext.getStore("Notes");

        notesStore.remove(currentNote);
        notesStore.sync();

        this.activateNotesList();
    },
    onBackToHomeCommand: function () {

        console.log("onBackToHomeCommand");
        this.activateNotesList();
    },
    onMenuSelect: function (menu, contener, index, data) {
        if (!this.__init) return;
        console.log("onMenuSelect");
        if (data.title == "Item 1") {
            //this.activateNotesList();
        }
        else if (data.title == "Item 2") {
            //this.onNewNoteCommand();
            var now = new Date();
            var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

            var newNote = Ext.create("NotesApp.model.Note", {
                id: noteId,
                dateCreated: now,
                title: "",
                narrative: ""
            });
            var noteEditorView = this.getNoteEditorView();
            noteEditorView.setRecord(newNote);
        }
        //return false;
    },

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        var notesStore = Ext.getStore("Notes");
        notesStore.load();
        console.log("launch");
        this.__init = true;
    },
    init: function () {
        this.__init = false;
        this.callParent(arguments);
        console.log("init");
    }
});