
if (Meteor.isClient) {

    var validateEmail = function(str) {
        var lastAtPos = str.lastIndexOf('@');
        var lastDotPos = str.lastIndexOf('.');
        return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') === -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
    };

    Session.setDefault('_slack_message', '');
    Session.setDefault('_slack_info', null);

    UI.registerHelper('slackInviteInput', function() {
        return Template._slack_signup;
    });

    Template._slack_signup.rendered = function() {
        Meteor.setInterval(function() {
            Meteor.call('slackInfo', function(err, res) {
                console.log('asdad' + err);
                if (!err && res) {
                    Session.set('_slack_info', res);
                } else {
                    Session.set('_slack_message', err.reason);
                }
            });
        }, 30000);
    };

    Template._slack_signup.helpers({
        signupDone: function() {
            return false;
        },
        hasSlackInfo: function() {
            return !Session.equals('_slack_info', null);
        },
        slackInfo: function() {
            return Session.get('_slack_info');
        },
        hasSlackMessage: function() {
            return !Session.equals('_slack_message', null);
        },
        slackMessage: function() {
            return Session.get('_slack_message');
        }
    });

    Template._slack_signup.events({
        'blur input': function(evt, tpl) {
            var emailval = evt.currentTarget.value;
            if (emailval.length > 0 && validateEmail(emailval)) {
                Meteor.call('slackInvite', emailval, function(error, result) {
                    if (!error && result) {
                        if(result.ok) {
                            Session.set('_slack_message', 'Successfully sent an invitation to <strong>' + emailval + '</strong>. Check your emails');
                        } else {
                            Session.set('_slack_message', result.error);
                        }
                    } else {
                        Session.set('_slack_message', error.reason);
                    }
                });
            } else {
                Session.set('_slack_message', 'Your have to enter a valid email to join the team');
            }
        },
        'keyup input': function(evt, tpl) {
            var emailval = evt.currentTarget.value;
            if (evt.which === 13 && emailval.length > 0 && validateEmail(emailval)) {
                Session.set('_slack_message', 'Email looks great! Sending invitation to <strong>' + emailval + '</strong>.');
                Meteor.call('slackInvite', emailval, function(error, result) {
                    if (!error && result) {
                        if(result.ok) {
                            Session.set('_slack_message', 'Successfully sent an invitation to <strong>' + emailval + '</strong>. Check your emails');
                        } else {
                            Session.set('_slack_message', result.error);
                        }
                    } else {
                        Session.set('_slack_message', error.reason);
                    }
                });
            } else {
                Session.set('_slack_message', 'Your have to enter a valid email to join the team');
            }
        }
    });
}

if (Meteor.isServer) {
    var token = Meteor.settings.private.slackAuthToken;
    var domain = Meteor.settings.private.slackDomain;

    Meteor.methods({
        slackInfo: function(email) {
            var result = HTTP.get('https://slack.com/api/rtm.start', {params: {token: token}});
            if (result) {
                var data = JSON.parse(result.content);
                var users = data.users;
                var total = users.length;

                var active = _.filter(users, function(user) {
                    return user.presence === 'active';
                }).length;

                var returndata = {
                    _id: 'slack',
                    online: parseInt(active - 1),      // no slackbot
                    registered: parseInt(total - 1)    // no slackbot
                };

                _.extend(returndata, _.pick(data.team, 'name', 'domain', 'icon'));
                return returndata;
            }
        },
        slackInvite: function(email) {
            check(email, String);
            if (!token) {
                throw new Meteor.Error(499, 'API authToken is missing.');
            } else {
                var url = "https://" + domain + ".slack.com/api/users.admin.invite";
                var data = {
                    email: email,
                    token: token,
                    set_active: true
                };
                var results = HTTP.call("POST", url, {
                    params: data
                }).data;
                return results;
            }
        }
    });
}
