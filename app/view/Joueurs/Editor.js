Ext.define("NotesApp.view.Joueurs.Editor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.joueureditorview",
    config: {
        scrollable: 'vertical',
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Modifier",
                items: [
                    {
                        xtype: "button",
                        ui: "back",
                        text: "Home",
                        itemId: "backJoueurButton"
                    },
                    { xtype: "spacer" },
                    {
                        xtype: "button",
                        ui: "action",
                        text: "Save",
                        itemId: "saveJoueurButton"
                    }
                ]
            },
            {
                xtype: "toolbar",
                docked: "bottom",
                items: [
                    {
                        xtype: "button",
                        iconCls: "trash",
                        iconMask: true,
                        itemId: "deleteJoueurButton"
                    }
                ]
            },
            { xtype: "fieldset",
                items: [
                    {
                        xtype: 'textfield',
                        name: 'id',
                        label: 'Login',
                        required: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'nom',
                        label: 'Nom',
                        required: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'prenom',
                        label: 'Prénom',
                        required: true
                    },
                    {
                        xtype: 'textareafield',
                        name: 'desc',
                        label: 'Motivation'
                    },
                    {
                        xtype: 'datepickerfield',
                        name: 'dateVoulu',
                        label: 'Date dispo',
                        destroyPickerOnHide: true,
                        dateFormat: 'd/m/Y',
                        minValue: new Date(),
                        value: new Date()
                    },
                    {
                        xtype: 'datepickerfield',
                        name: 'dateBirth',
                        label: 'Date de naissance',
                        destroyPickerOnHide: true,
                        dateFormat: 'd/m/Y',
                        minValue: new Date(),
                        value: new Date()
                    }
                ]
            }
        ],
        listeners: [
            {
                delegate: "#backJoueurButton",
                event: "tap",
                fn: "onBackButtonTap"
            },
            {
                delegate: "#saveJoueurButton",
                event: "tap",
                fn: "onSaveButtonTap"
            },
            {
                delegate: "#deleteJoueurButton",
                event: "tap",
                fn: "onDeleteButtonTap"
            }
        ]
    },
    onSaveButtonTap: function () {
        console.log("saveJoueurCommand");
        this.fireEvent("saveJoueurCommand", this);
    },
    onDeleteButtonTap: function () {
        console.log("deleteJoueurCommand");
        this.fireEvent("deleteJoueurCommand", this);
    },
    onBackButtonTap: function () {
        console.log("backToDetailsCommand");
        this.fireEvent("backToDetailsCommand", this);
    }

});

