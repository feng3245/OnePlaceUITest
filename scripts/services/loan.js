'use strict';

angular.module('cougarApp')
  .factory('Loan', function () {
    var Loan = {
      query: function(){
        return [
          {
            Property: {
              Id: 128,
              Name: 'Legacy Park'
            },
            Code: 23425,
            Type: '1st Mortgage',
            Lender: 'Standard Life',
            Amount: 13000000,
            EndDate: moment().add('years', 1).add('days', 7).add('hours', 4),
            Balance: 999999,
            Rate: 5.4,
            Description: Faker.Lorem.paragraph(1),
            Tags: ['Garden']
          },
          {
            Property: {
              Id: 128,
              Name: 'Legacy Park'
            },
            Code: 24255,
            Type: '2nd Mortgage',
            Lender: 'RBC',
            Amount: 5000000,
            EndDate: moment().add('years', 5).add('days', 1).add('hours', 4),
            Balance: 1999999,
            Rate: 6.3,
            Description: Faker.Lorem.paragraph(1),
            Tags: ['Office']
          }
        ];
      }
    };

    return Loan;
  });
