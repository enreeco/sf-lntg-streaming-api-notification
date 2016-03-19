public class StrApiListenerController {
	@AuraEnabled
    public static String getSessionId(){
        return UserInfo.getSessionId();
    }
}