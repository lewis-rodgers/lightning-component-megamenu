({
    /**
     * It sets an attribute on the component with an object
     * returned from the server.
     */
    getData: function(component) {
        var action = component.get('c.getNavigationBarData'),
        	lookup = component.get('v.list');

        action.setCallback(this, function(resp) {
            if (resp.getState() == 'SUCCESS') {
                var dataObj = resp.getReturnValue();

                // Store target list in its own variable.
                var list = dataObj[lookup];
                this.setShortDescription(list);
                component.set('v.data', list);
            }
        })
        $A.enqueueAction(action);
    },

    /**
     * Enumerates through the object with the intent to
     * run an operation to set and attach a property with a
     * short description.
     *
     * @param {Object} obj The object to manipulate
     */
    setShortDescription: function(list) {
        var desc = '';
        list.forEach(function(record) {
            desc = record.Opportunity__r.Description;
            if (desc !== undefined || "")
                this.setShortDescriptionProperty(record);
        }, this) // Pass `this` through so we can use helper functions.
    },

    /**
     * Based on the `Description` property of the record
     * it attaches a new `Short_Description` property to the same record.
     *
     * @param {Object} record
     */
    setShortDescriptionProperty: function(record) {
        var description = record.Opportunity__r.Description;
        record.Opportunity__r.Short_Description = this.truncate(description, 60);
    },

    /**
     * Shortens a string at predetermined character limit
     * and appends an ellipis.
     *
     * @param {String} str String to be shortened
     * @param {Number} characterLimit Maximum character count of shortend string
     * @returns {String}
     */
    truncate: function(str, characterLimit) {
        if (str.length > characterLimit)
            return str.substring(0, characterLimit) + '...';
        return str;
    },

    /**
     * @param {Boolean} show Set to true to display the element
     */
    toggleImage: function(event, show) {
        var target = event.srcElement.lastElementChild;
        show ? $A.util.removeClass(target, 'hidden')
        	 : $A.util.addClass(target, 'hidden')
    }
})
