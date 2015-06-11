Package.describe({
    name: 'herrhelms:meteor-slack-invite',
    version: '0.0.1',
    summary: 'Add people to your slack team by sending auto-invites',
    git: 'https://github.com/herrhelms/meteor-slack-invite.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(['http', 'mongo', 'templating', 'session']);
    api.addFiles(['slack-invite.css', 'slack-invite.html', 'slack-invite.js']);
});
