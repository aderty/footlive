Ext.define("NotesApp.controller.Matchs", {

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
            matchsListView: {
                selector: 'matchslistview',
                xtype: 'matchslistview',
                autoCreate: true
            },//"matchslistview",
            matchDetailsView: {
                selector: 'matchsdetailsview',
                xtype: 'matchsdetailsview',
                autoCreate: true
            },
            matchEditorView: {
                selector: 'matcheditorview',
                xtype: 'matcheditorview',
                autoCreate: true
            },//"matcheditorview",
            matchsList: "#matchsList"
        },
        control: {
            /*main: {
                select: "onMenuSelect",
                newNoteCommand: "onNewNoteCommand",
                backToHomeCommand: "onBackToHomeCommand"
            },*/
            matchsListView: {
                // The commands fired by the notes list container.
                newMatchCommand: "onNewMatchCommand",
                detailsMatchCommand: "onDetailsMatchCommand"
            },
            matchDetailsView:{
                editMatchCommand: "onEditMatchCommand",
                backToHomeCommand: "onBackToHomeCommand"
            },
            matchEditorView: {
                // The commands fired by the note editor.
                saveMatchCommand: "onSaveMatchCommand",
                deleteMatchCommand: "onDeleteMatchCommand",
                backToDetailsCommand: "onBackToDetailsCommand"
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
    activateMatchDetails: function(record, back){
        var matchDetailsView = this.getMatchDetailsView(), 
        direction = this.slideLeftTransition;;
        if(record){
            matchDetailsView.setRecord(record); // load() is deprecated.
        }
        if(back){
            direction = this.slideRightTransition;
        }
        this.mode = "details";
        this.getMain().setContainerItem(this.getMain(), matchDetailsView, direction);
    },
    activateMatchEditor: function (record) {
        //this.getMain().setListItem(1);
        var matchEditorView = this.getMatchEditorView();
        matchEditorView.setRecord(record); // load() is deprecated.
        matchEditorView.getFields("timeMatch").setValue({
            hour: record.data.dateMatch ? record.data.dateMatch.getHours() : 12,
            minute: record.data.dateMatch ? record.data.dateMatch.getMinutes() : 0,
        });
        //Ext.Viewport.animateActiveItem(matchEditorView, this.slideLeftTransition);
        this.getMain().setContainerItem(this.getMain(), matchEditorView, this.slideLeftTransition);
    },
    activateMatchsList: function () {
        this.mode = "list";
        //this.getMain().setListItem(0);
        //Ext.Viewport.animateActiveItem(this.getMatchsListView(), this.slideRightTransition);
        this.getMain().setContainerItem(this.getMain(), this.getMatchsListView(), this.slideRightTransition);
    },

    // Commands.
    onNewMatchCommand: function() {

        console.log("onNewMatchCommand");

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newMatch = Ext.create("NotesApp.model.Match", {
            id: noteId,
            dateCreated: now,
            dateMatch: now,
            title: "",
            nb: 10
        });
        this.mode = "create";
        this.activateMatchEditor(newMatch);

    },
    onDetailsMatchCommand: function(list, record) {

        console.log("onDetailsMatchCommand");

        this.activateMatchDetails(record);
    },
    onEditMatchCommand: function(list, record) {

        console.log("onEditMatchCommand");
        this.mode = "edit";
        this.activateMatchEditor(record);
    },
    onSaveMatchCommand: function() {

        console.log("onSaveMatchCommand");

        var matchEditorView = this.getMatchEditorView();

        var currentNote = matchEditorView.getRecord();
        var newValues = matchEditorView.getValues();
        
        newValues.dateMatch.setHours(newValues.timeMatch.hour);
        newValues.dateMatch.setMinutes(newValues.timeMatch.minute);

        // Update the current note's fields with form values.
        currentNote.set("title", newValues.title);
        currentNote.set("desc", newValues.desc);
        currentNote.set("dateMatch", newValues.dateMatch);

        var errors = currentNote.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.first().getMessage() /*errors.getByField("title")[0].getMessage()*/, Ext.emptyFn);
            currentNote.reject();
            return;
        }

        var matchsStore = Ext.getStore("Matchs");

        if (null == matchsStore.findRecord('id', currentNote.data.id)) {
            matchsStore.add(currentNote);
        }

        matchsStore.sync();

        matchsStore.sort([{ property: 'dateMatch', direction: 'DESC'}]);

        this.activateMatchsList();
    },
    onDeleteMatchCommand: function () {
        Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(btn){
            if(btn == "no"){
                return;
            }
            console.log("onDeleteMatchCommand");

            var matchEditorView = this.getMatchEditorView();
            var currentNote = matchEditorView.getRecord();
            var matchsStore = Ext.getStore("Matchs");

            matchsStore.remove(currentNote);
            matchsStore.sync();

            this.activateMatchsList();
        }, this);
    },
    onBackToHomeCommand: function () {

        console.log("onBackToHomeCommand");
        this.activateMatchsList();
    },
    onBackToDetailsCommand: function () {
        if(this.mode == "create"){
            console.log("onBackToListCommand");
            this.activateMatchsList();
        }
        else{
            console.log("onBackToDetailsCommand");
            this.activateMatchDetails(null, true);
        }
    },
    /*onMenuSelect: function (menu, contener, index, data) {
        if (!this.__init) return;
        console.log("onMenuSelect");
        if (data.title == "Item 1") {
            //this.activateMatchsList();
        }
        else if (data.title == "Item 2") {
            //this.onNewNoteCommand();
            var now = new Date();
            var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

            var newMatch = Ext.create("NotesApp.model.Match", {
                id: noteId,
                dateCreated: now,
                title: "",
                nb: 10
            });
            var matchEditorView = this.getMatchEditorView();
            matchEditorView.setRecord(newMatch);
        }
        //return false;
    },*/

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        var matchsStore = Ext.getStore("Matchs");
        matchsStore.load();
        console.log("launch");
        this.__init = true;
    },
    init: function () {
        this.__init = false;
        this.callParent(arguments);
        console.log("init");
    }
});