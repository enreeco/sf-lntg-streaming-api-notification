({
	handleStreamingAPIEvent: function(component, event) {
        var ns = component.getDef().getDescriptor().getNamespace();

        var topicName = event.getParam('topic');
        var data = event.getParam('data');
        var evt = event.getParam('event');

        if(topicName !== component.get('v.topic')) return;
        
        $A.get("e."+ns+":ShowNotificationEvent").setParams({
            title: this.compileTemplate(component.get('v.title'), data),
            content: this.compileTemplate(component.get('v.content'), data),
            style: component.get('v.style'),
        }).fire();
        
	},
    compileTemplate: function(message, payload){
        if(!message) return message;
        var regex = /\{\{(\$|([a-zA-Z][a-zA-Z0-9_]*))\}\}/gi, result;

        while ( (result = regex.exec(message)) ) {

            var field = result[0].replace('{{','').replace('}}','');
            var fieldValue = payload[field] || '';
            if(field === '$'){
                fieldValue = ''+(payload || '');
            }
			message = message.replace(result[0],fieldValue);
        }
        return message;
    }
})