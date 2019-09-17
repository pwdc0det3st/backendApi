'use strict'
const Mailchimp = require('mailchimp-api-v3');
const API_KEY = 'fed589b1954a061fec584cce7a066cc8-us4',
    LIST_ID = '38cd255891';

async function addProspectToList(prospect) {
    var mailchimp = new Mailchimp(API_KEY);
    return mailchimp.request({
        method: 'post',
        path: '/lists/' + LIST_ID + '/members',
        body: {
            email_address: prospect.email,
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


exports.handler = async (event, context, callback) => {
    const responce = {
    };
    const prospect = JSON.parse(event.body);
    console.log(prospect);
    await addProspectToList(prospect)
    .then(results => {
        responce.statusCode = 200;
        responce.body = JSON.stringify({
            message : 'Prospect Succsfully Added'
        });
    })
    .catch(error => {
        responce.statusCode = error.statusCode,
        responce.body = JSON.stringify({
            message :  error.title == 'Member Exists'? error.title : 'Something went wrong'
        })
    })
    return responce;

}