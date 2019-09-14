'use strict'
const Mailchimp = require('mailchimp-api-v3');
const API_KEY = 'fed589b1954a061fec584cce7a066cc8-us4',
    LIST_ID = '38cd255891';

return function addProspectToList(prospect) {
    var mailchimp = new Mailchimp(API_KEY);
    mailchimp.request({
        method: 'post',
        path: '/lists/' + LIST_ID + '/members',
        body: {
            email_address: prospect.emailAddress,
            merge_fields : {
                FNAME : prospect.firstName,
                LNAME : prospect.lastName,
                ADDRESS : prospect.address,
                PHONE : prospect.phone

            },
            status: 'subscribed'
        }
    })
}


exports.handler = function (event, context, callback) {
    const responce = {};
    await addToList(emailAddress)
    .then(results => {
        responce.status = 200;
        responce.message = 'Prospect Succsfully Added';
    })
    .catch(error => {
        responce.status = error.statusCode,
        responce.message = error.title == 'Member Exists'? error.title : 'Something went wrong'
    })
    return responce;

}