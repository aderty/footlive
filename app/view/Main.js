﻿Ext.define("NotesApp.view.Main", {
    extend: 'Ext.ux.slidenavigation.View',

    requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.event.publisher.Dom'
    ],
    alias: "widget.mainview",
    config: {
        fullscreen: true,

        /**
         *  Any component within the container with an 'x-toolbar' class
         *  will be draggable.  To disable draggin all together, set this
         *  to false.
         */
        slideSelector: 'x-toolbar',

        /**
         *  Container must be dragged 10 pixels horizontally before allowing
         *  the underlying container to actually be dragged.
         *
         *  @since 0.2.2
         */
        containerSlideDelay: 10,

        /**
         *  Time in milliseconds to animate the closing of the container
         *  after an item has been clicked on in the list.
         */
        selectSlideDuration: 200,

        /**
         *  Enable content masking when container is open.
         *
         *  @since 0.2.0
         */
        itemMask: true,

        /**
         *  Define the default slide button config.  Any item that has
         *  a `slideButton` value that is either `true` or a button config
         *  will use these values at the default.
         */
        slideButtonDefaults: {
            selector: 'toolbar'
        },

        /**
         *  This allows us to configure how the actual list container
         *  looks.  Here we've added a custom search field and have
         *  modified the width.
         */
        list: {
            maxDrag: 400,
            width: 200,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',
                title: {
                    title: 'Menu',
                    centered: false,
                    width: 200,
                    left: 0
                }

                /**
                 *  Here's an example of how to add a different type of
                 *  component into the toolbar of the list.
                 */
                /*
                items: [{
                    docked: 'top',
                    xtype: 'searchfield',
                    placeHolder: 'search',
                    width: 180
                }]
                */
            }]

        },

        /**
         *  Change this to 'right' to dock the navigation list to the right.
         */
        listPosition: 'left',

        /**
         *  Example of how to re-order the groups.
         */
        groups: {
            'Matchs': 1,
            'Joueurs': 3,
            'Group 3': 2
        },

        /**
         *  These are the default values to apply to the items within the
         *  container.
         */
        defaults: {
            style: 'background: #CCC',
            xtype: 'container'
        },

        items: [{
            id: 'matchs_list',
            title: 'Tous',
            group: 'Matchs',
            icon: 'resources/images/ball.png',

            // Enable the slide button using the defaults defined above in
            // `slideButtonDefaults`.
            slideButton: true,
            items: [ {
                xtype: 'matchslistview',
                iconMask: false,
                // Mask this item when the container is opened
                maskOnOpen: true
            }]
        }, {
            id:'matchs_new',
            title: 'New',
            group: 'Matchs',
            slideButton: true,
            items: [{
                xtype: 'matcheditorview',
                iconMask: false,
                // Mask this item when the container is opened
                maskOnOpen: true
            }]},
            {
                id: 'joueurs_list',
            title: 'Tous',
            group: 'Joueurs',
            icon: 'resources/images/user.png',
            slideButton: true,
            items: [{
                xtype: 'joueurslistview',
                iconMask: false,
                // Mask this item when the container is opened
                maskOnOpen: true
}]
            }, {
            id: 'joueurs_new',
            title: 'New',
            group: 'Joueurs',
            slideButton: true,
            items: [{
                xtype: 'joueureditorview',
                iconMask: false,
                // Mask this item when the container is opened
                maskOnOpen: true
            }]
            },
        ]
    }
});
