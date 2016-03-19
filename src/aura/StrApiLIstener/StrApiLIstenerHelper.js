({
	openCometDConnection : function(component, event) {

        var action = component.get("c.getSessionId");
        action.setCallback(this, function(a) {
            var sid = a.getReturnValue();
            var topics = component.get('v.topics');
            var apiVersion = component.get('v.apiVersion');

            //init connection
            $.cometd.init({
               url: '/cometd/'+apiVersion+'.0',
               requestHeaders: { Authorization: 'OAuth '+sid},
               appendMessageTypeToURL: false,
            });
            
            //iterates through
            topics = topics.split(',');
            
            for(index in topics){
                if(!topics[index] || !topics[index].trim()) continue;
                this.subscribeTopic(component, topics[index].trim());
            }

            if(component.get('v.debugMetaChannels')){
                //meta channels
                $.cometd.subscribe('/meta/connect', function(message) {
                    console.log(message);
                });
                $.cometd.subscribe('/meta/handshake', function(message) {
                    console.log(message);
                });
                $.cometd.subscribe('/meta/subscribe', function(message) {
                    console.log(message);
                });
            }
            
            //closes connection of window close
            window.onbeforeunload = function(){
                $.cometd.disconnect();
            };

        });
        
        $A.enqueueAction(action);
        
	},

    //creates subscription to a given topic
    subscribeTopic: function(component, topic){
        var ns = component.getDef().getDescriptor().getNamespace();
        var topicPath = '/topic/'+topic;
        //this is a custom streaming channel
        if(topic.indexOf('/') >= 0){
            topicPath = topic;
        }
        $.cometd.subscribe(topicPath, function(message) {
            $A.run(function(){
                if(topic.indexOf('/') >= 0){
                    $A.get("e."+ns+":StreamingAPIEvent").setParams({
                        topic: topic,
                        data: message.data.payload,
                        event: message.data.event,
                    }).fire(); 
                }else{
                    $A.get("e."+ns+":StreamingAPIEvent").setParams({
                        topic: topic,
                        data: message.data.sobject,
                        event: message.data.event,
                    }).fire(); 
                }
            });
        });
    },
})