({
	doInit : function(component, event, helper) {
        var hideAfter = component.get('v.hideAfter') || 3;
        hideAfter *= 1000;
        if(hideAfter <= 0) return;
        window.setTimeout(function(){
            $A.run (function() {
                if(!component.isValid()) return;
        		$A.util.addClass(component.find("base"),'slds-transition-hide');    
            });
        }, hideAfter);
	},
    closeToast: function(component, event, helper){     
        if(!component.isValid()) return;
        $A.util.addClass(component.find('base'),'slds-transition-hide');        
    }
})