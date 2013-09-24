Ext.define('Ext.ux.timepicker.View', {
    extend: 'Ext.Picker',

    requires: [
        'Ext.Button',
        'Ext.Container',
        'Ext.Function',
        'Ext.Toolbar',
        'Ext.data.Model',
        'Ext.data.ModelManager',
        'Ext.data.Store',
        'Ext.dataview.List'
    ],

    xtype: 'timepickerview',
    config: {
        /**
        * @cfg {String} hourText
        * The label to show for the hour column. Defaults to 'Hour'.
        */
        hourText: 'Hour',

        /**
        * @cfg {String} minuteText
        * The label to show for the minute column. Defaults to 'Minute'.
        */
        minuteText: 'Minute',

        /**
        * @cfg {String} daynightText
        * The label to show for the daynight column. Defaults to 'AM/PM'.
        */
        daynightText: 'AM/PM',

        /**
        * @cfg {Object/Date} value
        * Default value for the field and the internal {@link Ext.DatePicker} component. Accepts an object of 'year', 
        * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
        * 
        * Examples:
        * {year: 1989, day: 1, month: 5} = 1st May 1989. 
        * new Date() = current date
        */

        /**
        * @cfg {Array} slotOrder
        * An array of strings that specifies the order of the slots. Defaults to <tt>['month', 'day', 'year']</tt>.
        */
        slotOrder: ['hour', 'minute']
    },

    initialize: function() {
        this.callParent();

        this.on({
            scope: this,
            delegate: '> slot',
            slotpick: this.onSlotPick
        });

        this.on({
            scope: this,
            show: this.onSlotPick
        });
    },

    // @private
    constructor: function() {
        this.callParent(arguments);
        this.createSlots();
    },

    createSlots: function() {
        var me = this,
            slotOrder = me.getSlotOrder(),
            hours = [],
            minutes = [],
            daynight = [],
            ln, tmp, i;


        for (i = 1; i <= 24; i++) {
            hours.push({
                text: i + " h",
                value: i
            });
        }

        for (i = 0; i <= 59; i += 15) {
            minutes.push({
                text: i + " min",
                value: i
            });
        }

        var slots = [];

        slotOrder.forEach(function(item) {
            slots.push(me.createSlot(item, hours, minutes));
        });

        me.setSlots(slots);
    },

    createSlot: function(name, hours, minutes, daynight) {
        switch (name) {
            case 'hour':
                return {
                    name: 'hour',
                    align: 'center',
                    data: hours,
                    title: this.getUseTitles() ? this.getHourText() : false,
                    flex: 2
                };
            case 'minute':
                return {
                    name: 'minute',
                    align: 'center',
                    data: minutes,
                    title: this.getUseTitles() ? this.getMinuteText() : false,
                    flex: 2
                };
            case 'daynight':
                return {
                    name: 'daynight',
                    align: 'center',
                    data: daynight,
                    title: this.getUseTitles() ? this.getDaynightText() : false,
                    flex: 2
                };
        }
    },

    // @private
    onSlotPick: function() {
        /*var value = this.getValue(true),
        slot = this.getDaySlot(),
        year = value.getFullYear(),
        month = value.getMonth(),
        days = [],
        daysInMonth, i;

        if (!value || !Ext.isDate(value) || !slot) {
        return;
        }*/

        this.callParent();
    },

    /**
    * Gets the current value as a Date object
    * @return {Date} value
    */
    setValue: function(value, animated) {
        if (value) {
            value = {
                hour: value.hour ? value.hour : 12,
                minute: value.minute ? value.minute : 0
            };
        }
        else {
            value = {
                hour: 12,
                minute: 0
            };
        }
        /*var key, slot, items = this.items.items,
            ln = items.length;

        for (key in value) {
            slot = this.child('[name=' + key + ']');
            if (slot) {
                slot.setValue(value[key], animated);
            }
        }*/

        this.callParent([value, animated]);

        return this;
    },

    getValue: function(useDom) {
        var values = {},
            items = this.getItems().items,
            ln = items.length,
            hour, minute, item, i;

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item instanceof Ext.picker.Slot) {
                values[item.getName()] = item.getValue(useDom);
            }
        }

        //if all the slots return null, we should not return a date
        if (values.hour === null && values.minute === null) {
            return null;
        }

        hour = Ext.isNumber(values.hour) ? values.hour : 12;
        minute = Ext.isNumber(values.minute) ? values.minute : 0;

        return {
            hour: hour,
            minute: minute
        };
    },

    onDoneButtonTap: function() {
        var oldValue = this._value,
            newValue = this.getValue(true),
            testValue = newValue;

        if (!oldValue || (newValue.hour != oldValue.hour || newValue.minute != oldValue.minute)) {
            this.fireEvent('change', this, newValue);
        }

        this.hide();
    }
});

Ext.define('Ext.ux.timepicker.Field', {
    extend: 'Ext.field.Text',

    xtype: 'timepickerfield',
    config: {
        ui: 'select',
        picker: true,
        clearIcon: false,

        // @cfg {Boolean} useMask @hide
        useMask: true,

        monitorOrientation: true,
        dateFormat: '{0}:{1}',
    },
    onChange: Ext.emptyFn,
    // @private
    initialize: function() {
        var me = this,
            component = me.getComponent();

        me.callParent();

        component.on({
            scope: me,
            masktap: 'onMaskTap'
        });

        if (Ext.os.is.Android2) {
            component.input.dom.disabled = true;
        }
    },
    reset: function() {
        this.setValue(this.originalValue);
    },
    updateValue: function(newValue, oldValue) {
        var me = this,
            picker = me._picker;

        if (picker && picker.isPicker) {
            picker.setValue(newValue);
        }

        if (newValue !== null) {
            me.getComponent().setValue(Ext.String.format(me.getDateFormat(), newValue.hour, newValue.minute));
        } else {
            me.getComponent().setValue('');
        }

        if (newValue !== oldValue) {
            me.fireEvent('change', me, newValue, oldValue);
        }
    },
    getValue: function() {
        if (this._picker && this._picker instanceof Ext.ux.timepicker.View) {
            return this._picker.getValue();
        }

        return this._value;
    },
    applyPicker: function(picker, pickerInstance) {
        if (pickerInstance && pickerInstance.isPicker) {
            picker = pickerInstance.setConfig(picker);
        }

        return picker;
    },
    getPicker: function() {
        var picker = this._picker,
            value = this.getValue();

        if (picker && !picker.isPicker) {
            picker = Ext.factory(picker, Ext.ux.timepicker.View);
            if (value != null) {
                picker.setValue(value);
            }
        }

        picker.on({
            scope: this,
            change: 'onPickerChange',
            hide: 'onPickerHide'
        });
        Ext.Viewport.add(picker);
        this._picker = picker;

        return picker;
    },

    // @private
    onMaskTap: function() {
        if (this.getDisabled()) {
            return false;
        }

        this.onFocus();

        return false;
    },
    onPickerChange: function(picker, value) {
        var me = this,
            oldValue = me.getValue();

        me.setValue(value);
        me.fireEvent('select', me, value);
        me.onChange(me, value, oldValue);
    },
    onFocus: function(e) {
        var component = this.getComponent();
        this.fireEvent('focus', this, e);

        if (Ext.os.is.Android4) {
            component.input.dom.focus();
        }
        component.input.dom.blur();

        if (this.getReadOnly()) {
            return false;
        }

        this.isFocused = true;

        this.getPicker().show();
    },
    destroy: function() {
        var picker = this._picker;

        if (picker && picker.isPicker) {
            picker.destroy();
        }

        this.callParent(arguments);
    }
});

