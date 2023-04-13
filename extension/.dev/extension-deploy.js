//https://www.npmjs.com/package/chrome-extension-deploy
var fs = require('fs');
var deploy = require('chrome-extension-deploy');

deploy({
    // obtained by following the instructions here:
    // https://developer.chrome.com/webstore/using_webstore_api#beforeyoubegin
    clientId: '197829843028-vg3eb0svn2do4at6sfs6oe0auaulgtd7.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: 'myRefreshToken',

    // the ID of your extension (from chrome webstore developer dashboard)
    id: 'fphcegdfaopikjkodccnlgjjedmhgoml',

    // a Buffer or string containing your zipped extension
    zip: fs.readFileSync('.dist/extension.zip'),

    // whether to publish your extension to the public or trusted testers
    // OPTIONAL (default `deploy.PUBLIC`)
    to: deploy.TRUSTED_TESTERS
}).then(function () {
    // success!
}, function (err) {
    // failure :(
    // errors are sanitized, so your tokens will not be leaked
});
