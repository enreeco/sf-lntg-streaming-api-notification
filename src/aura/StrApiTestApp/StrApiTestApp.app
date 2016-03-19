<aura:application >
    <ltng:require styles="/resource/SLDS100/assets/styles/salesforce-lightning-design-system-ltng.css" />
    <div class="slds">
        <div class="slds-page-header" role="banner">
            <div class="slds-media">
                <div class="slds-media__figure">
                    <c:svg class="slds-icon slds-icon--large slds-icon-standard-opportunity" ariaHidden="true"
                               xlinkHref="/resource/SLDS100/assets/icons/standard-sprite/svg/symbols.svg#opportunity" />
                </div>
            <div class="slds-media__body">
                <p class="slds-page-header__title slds-truncate slds-align-middle">Streaming API Notification Deck</p>
                <p class="slds-text-body--small slds-page-header__info">Create a Lead / Opportunity and watch the notifications</p>
            </div>
            </div>
        </div>
    </div>

    <c:StrApiNotificationDeck topics="Opportunity_Won,Lead_Converted,/u/CustomChannel"
        apiVersion="36" 
        notificationType="Alert" 
        hideAfter="5"/>
    
    <c:StrApiTopicTemplate topic="Lead_Converted"
                                 style="warning" 
                                 title="Created new lead called {{Name}}"
                                 content="Company: {{Company}}"/>
    <c:StrApiTopicTemplate topic="Opportunity_Won"
                                 style="success" 
                                 title="Won ${{Amount}}!"
                                 content="Name is {{Name}}" />

    <!-- custom streaming channel -->
    <c:StrApiTopicTemplate topic="/u/CustomChannel"
                                 style="info" 
                                 title="Message received"
                                 content="{{$}}" />
</aura:application>