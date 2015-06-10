# meteor-slack-invite

Add people to your slack team by sending auto-invites

### basic usage

This package esposes a text input field {{>slackInviteEmail}} that your visitors can use to autosignup into a slack team of your choice. (You need to provide the teams autoToken)

### setup

1. go, and create your teams slack authToken at [slack.com](https://api.slack.com/web) to access the slack API.
2. create a settings.json file in your meteor projects root directory

```JSON
{
    "private": {
        "slackAuthToken": "YOURTOKENHERE"
    }
}
```

3. add package to your meteor project `meteor add herrhelms:meteor-slack-invite`
4. run your project with `meteor --settings settings.json` (optionally with port `--port XXXX`)
