({
	handleShowNotificationEvent : function(component, event) {
        var ns = component.getDef().getDescriptor().getNamespace();
        var notificationType = component.get('v.notificationType');
        var title = event.getParam('title');
        var content = event.getParam('content') || '';
        var style = event.getParam('style') || '';
		var hideAfter = component.get('v.hideAfter');

        $A.createComponent(
            ns+':UINotification',
            {
                title: title,
                content: content,
                style: style,
                type: notificationType,
                hideAfter: hideAfter,
            },
            function(cmp) {
                var body = component.get("v.body");
                body.push(cmp);
                component.set("v.body", body);
                
		});

	}
})