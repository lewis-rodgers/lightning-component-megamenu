({
	getData: function(component, event, helper) {
        helper.getData(component);
	},
    showImg: function(component, event, helper) {
        helper.toggleImage(event, true);
    },
    hideImg: function(component, event, helper) {
        helper.toggleImage(event);
    }
})
