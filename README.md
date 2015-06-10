# meteor-slack-invite

Add people to your slack team by sending auto-invites

### setup

1. go, and create your teams slack authToken at [slack.com](http://slack.com) to access the slack API.
2. create a settings.json file in your meteor project directory 

`JSON
{
    "private":{
        "slackAuthToken": "YOURTOKENHERE"
    }
}
`

3. add package to your meteor project `meteor add herrhelms:meteor-slack-invite`
4. run your project with `meteor --settings settings.json` (optionally add port number with `--port YOURPORTNUMBER`)
