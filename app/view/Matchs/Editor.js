Ext.define("NotesApp.view.Matchs.Editor", {
    extend: "Ext.form.Panel",
    requires: [
        "Ext.form.FieldSet",
        "Ext.ux.timepicker.Field"
    ],
    alias: "widget.matcheditorview",
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
                        text: "",
                        itemId: "backButton",
                        iconCls: 'reply',
                        iconMask: true
                    },
                    { xtype: "spacer" },
                    {
                        xtype: "button",
                        ui: "action",
                        text: "Save",
                        itemId: "saveButton"
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
                        itemId: "deleteButton"
                    }
                ]
            },
            { xtype: "fieldset",
                items: [
                    {
                        xtype: 'textfield',
                        name: 'title',
                        label: 'Titre',
                        required: true
                    },
                    {
                        xtype: 'textareafield',
                        name: 'desc',
                        label: 'Description'
                    },
                    {
                        xtype: 'spinnerfield',
                        name: 'nb',
                        label: 'Nb de participants',
                        stepValue: 1,
                        value: 10,
                        minValue: 0,
                        maxValue: 100
                    },
                    {
                        xtype: 'datepickerfield',
                        name: 'dateMatch',
                        label: 'Date',
                        destroyPickerOnHide: true,
                        dateFormat: 'd/m/Y',
                        minValue: new Date(),
                        value: new Date()
                    },
                    {
                        xtype: 'timepickerfield',
                        name: 'timeMatch',
                        label: 'Heure'
                    }
                ]
            }
        ],
        listeners: [
            {
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTap"
            },
            {
                delegate: "#saveButton",
                event: "tap",
                fn: "onSaveButtonTap"
            },
            {
                delegate: "#deleteButton",
                event: "tap",
                fn: "onDeleteButtonTap"
            }
        ]
    },
    onSaveButtonTap: function () {
        console.log("saveMatchCommand");
        this.fireEvent("saveMatchCommand", this);
    },
    onDeleteButtonTap: function () {
        console.log("deleteMatchCommand");
        this.fireEvent("deleteMatchCommand", this);
    },
    onBackButtonTap: function () {
        console.log("backToDetailsCommand");
        this.fireEvent("backToDetailsCommand", this);
    }

});

