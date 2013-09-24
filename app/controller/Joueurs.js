Ext.define("NotesApp.controller.Joueurs", {

    extend: "Ext.app.Controller",
    requires: ['Ext.MessageBox'],
    config: {
        refs: {
            main: {
                selector: 'mainview',
                xtype: 'mainview',
                autoCreate: true
            },
            // We're going to lookup our views by xtype.
            joueursListView: {
                selector: 'joueurslistview',
                xtype: 'joueurslistview',
                autoCreate: true
            }, //"noteslistview",
            joueurDetailsView: {
                selector: 'joueurdetailsview',
                xtype: 'joueurdetailsview',
                autoCreate: true
            },
            joueurEditorView: {
                selector: 'joueureditorview',
                xtype: 'joueureditorview',
                autoCreate: true
            }, //"noteeditorview",
            joueursList: "#joueursList"
        },
        control: {
            /*main: {
            select: "onMenuSelect",
            newJoueurCommand: "onNewJoueurCommand",
            backToHomeCommand: "onBackToHomeCommand"
            },*/
            joueursListView: {
                // The commands fired by the notes list container.
                newJoueurCommand: "onNewJoueurCommand",
                detailsJoueurCommand: "onDetailsJoueurCommand"
            },
            joueurDetailsView: {
                editJoueurCommand: "onEditJoueurCommand",
                backToHomeCommand: "onBackToHomeCommand"
            },
            joueurEditorView: {
                // The commands fired by the note editor.
                saveJoueurCommand: "onSaveJoueurCommand",
                deleteJoueurCommand: "onDeleteJoueurCommand",
                backToDetailsCommand: "onBackToDetailsCommand"
            }

        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    // Helper functions
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateJoueurDetails: function(record, back) {
        var joueurDetailsView = this.getJoueurDetailsView(),
        direction = this.slideLeftTransition; ;
        if (record) {
            joueurDetailsView.setRecord(record); // load() is deprecated.
        }
        if (back) {
            direction = this.slideRightTransition;
        }
        this.mode = "details";
        this.getMain().setContainerItem(this.getMain(), joueurDetailsView, direction);
    },
    activateJoueurEditor: function(record) {
        //this.getMain().setListItem(1);
        var noteEditorView = this.getJoueurEditorView();
        noteEditorView.setRecord(record); // load() is deprecated.
        //Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
        this.getMain().setContainerItem(this.getMain(), noteEditorView, this.slideLeftTransition);
    },
    activateJoueursList: function() {
        this.mode = "list";
        //this.getMain().setListItem(0);
        //Ext.Viewport.animateActiveItem(this.getJoueursListView(), this.slideRightTransition);
        this.getMain().setContainerItem(this.getMain(), this.getJoueursListView(), this.slideRightTransition);
    },

    // Commands.
    onNewJoueurCommand: function() {

        console.log("onNewJoueurCommand");

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newMatch = Ext.create("NotesApp.model.Joueur", {
            id: "",
            dateCreated: now,
            nom: "",
            prenom: ""
        });
        this.mode = "create";
        this.activateJoueurEditor(newMatch);

    },
    onDetailsJoueurCommand: function(list, record) {

        console.log("onDetailsJoueurCommand");

        this.activateJoueurDetails(record);
    },
    onEditJoueurCommand: function(list, record) {

        console.log("onEditJoueurCommand");
        this.mode = "edit";
        this.activateJoueurEditor(record);
    },
    onSaveJoueurCommand: function() {

        console.log("onSaveJoueurCommand");

        var noteEditorView = this.getJoueurEditorView();

        var currentNote = noteEditorView.getRecord();
        var newValues = noteEditorView.getValues();

        // Update the current note's fields with form values.
        currentNote.set("id", newValues.id);
        currentNote.set("nom", newValues.nom);
        currentNote.set("prenom", newValues.prenom);
        currentNote.set("dateBirth", newValues.dateBirth);
        currentNote.set("dateVoulu", newValues.dateVoulu);

        var errors = currentNote.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.first().getMessage() /*errors.getByField("title")[0].getMessage()*/, Ext.emptyFn);
            currentNote.reject();
            return;
        }

        var joueursStore = Ext.getStore("Joueurs");

        if (null == joueursStore.findRecord('id', currentNote.data.id)) {
            joueursStore.add(currentNote);
        }

        joueursStore.sync();

        joueursStore.sort([{ property: 'date', direction: 'DESC'}]);

        this.activateJoueursList();
    },
    onDeleteJoueurCommand: function() {
        Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(btn) {
            if (btn == "no") {
                return;
            }
            console.log("onDeleteNoteCommand");

            var noteEditorView = this.getJoueurEditorView();
            var currentNote = noteEditorView.getRecord();
            var joueursStore = Ext.getStore("Joueurs");

            joueursStore.remove(currentNote);
            joueursStore.sync();

            this.activateJoueursList();
        }, this);
    },
    onBackToHomeCommand: function() {

        console.log("onBackToHomeCommand");
        this.activateJoueursList();
    },
    onBackToDetailsCommand: function() {
        if (this.mode == "create") {
            console.log("onBackToListCommand");
            this.activateJoueursList();
        }
        else {
            console.log("onBackToDetailsCommand");
            this.activateJoueurDetails(null, true);
        }
    },
    // Base Class functions.
    launch: function() {
        this.callParent(arguments);
        var joueursStore = Ext.getStore("Joueurs");
        joueursStore.load();
        console.log("launch");
        this.__init = true;
    },
    init: function() {
        this.__init = false;
        this.callParent(arguments);
        console.log("init");
    }
});