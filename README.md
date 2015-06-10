# meteor-slack-invite

Get people signed up into your slack team the meteor way.

### basic usage

The package exposes a text input {{>slackInviteEmail}} where anyone can enter their email to autosignup into a slack team of your choice.

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

