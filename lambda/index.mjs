export const handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var body = JSON.parse(event.body);
    var auth = event.headers.Authorization;
    var bookId = body.bookId;
    var actionType = body.actionType;
    var libraryName = body.libraryName;
    var cardId = getCardId(auth, libraryName);
    requestLibby(auth, actionType, cardId, bookId);
    var res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "*/*",
            "Access-Control-Allow-Origin": "*"
        },
        "body": "Success"
    };
    callback(null, res);
};

function requestLibby(auth, actionType, cardId, bookId) {
    fetch('https://sentry-read.svc.overdrive.com/card/'+ cardId + '/' + actionType + '/' + bookId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': auth
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getCardId(token, libraryName) {
    var tokenValue = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    var accounts = tokenValue.chip.accounts;
    for (var account of accounts) {
        for (var card of account.cards) {
            if (card.lib.key === libraryName) {
                return card.id;
            }
        }
    }
}