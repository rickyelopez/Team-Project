function ValidateTweetContent(content)
{
    if (content ==="" || content===null)
    return false;
    if (content.length>140 || content.length<10)
    return false;
    if (/(shit|fuck|motherfucker|ass|asshole|bitch)/.test(content)){ // check if the user is using curse words
        console.log("please be polite! :-)");
        return false;

    }
    
    
    return true;
}

var ServerResponses = ServerResponses = {
    SUCCESS: 'success'
};

$(document).ready(function() {

    $("#tweet_btn").click(function(){

        var validateTweet = function(){

            var error = 0;
            var tweetUserName = $('#userName');     // This is broken. Doesn't take from header with id userName in profile.html.
            var tweetContent = $('#tweet_content').val();

            // Check for nothing entered as a message.
            if(tweetContent == null || tweetContent == ''){
                $('#noContentWarning').text('That\'s a pretty boring message. Try typing something.');
                error = 1;
            }

            if(error == 0){
                var tweet = new Object();
                tweet.userName = "test2";
                tweet.content = tweetContent;

                alert("This is the JSON produced: " + JSON.stringify(tweet));

                $.post("/tweet_submit", JSON.stringify(tweet), function(m_response){
                    alert(m_response.status)
                    switch(m_response.status){
                        case ServerResponses.SUCCESS:
                            alert("tweet has been published!");
                            break;
                        default:
                            alert("[cheeky error message]");
                    }
                })
            }
        };

        $('#noContentWarning').text('');
        validateTweet();
    });
});