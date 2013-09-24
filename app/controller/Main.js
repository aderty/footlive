Ext.define("NotesApp.controller.Main", {

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
            nodesListView: {
                selector: 'noteslistview',
                xtype: 'noteslistview',
                autoCreate: true
            }, //"noteslistview",
            joueursListView: {
                selector: 'joueurslistview',
                xtype: 'joueurslistview',
                autoCreate: true
            } //"noteeditorview",
        },
        control: {
            main: {
                select: "onMenuSelect"
            }
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    onMenuSelect: function(menu, contener, index, data) {
        if (!this.__init) return;
        console.log("onMenuSelect");
        if (data.index == 0) {
            //this.getMain().setContainerItem(this.getMain(), this.getNodesListView(), this.slideLeftTransition);
        }
        else if (data.index == 2) {
            //this.getMain().setContainerItem(this.getMain(), this.getJoueursListView(), this.slideLeftTransition);
        }
        //return false;
    },

    // Base Class functions.
    launch: function() {
        this.callParent(arguments);
        console.log("launch");
        this.__init = true;
    },
    init: function() {
        this.__init = false;
        this.callParent(arguments);
        console.log("init");
    }
});