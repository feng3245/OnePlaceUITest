'use strict';

angular.module('cougarApp')
  .factory('Model', function () {
    return {
      models: function(){
          return [
            {
                Id: 1,
                name: 'Live',
                description: 'The live model for this property',
                createdBy: 'Joseph Long',
                workflow: 'In Progress',
                updated: '12/29/2012',
                primary: true
            },
            {
                Id: 2,
                name: 'Annual Valuation',
                description: 'Valuation model based on DCF method',
                createdBy: 'Joe Estrada',
                workflow: 'In Review',
                updated: '12/30/2012'
            },
            {
                Id: 3,
                name: 'Annual Budget',
                description: '2014 budget model (12 months)',
                createdBy: 'Christian Stephens',
                workflow: 'Approved',
                updated: '1/1/2013'
            },
            {
                Id: 4,
                name: 'Q2 Reforecast',
                description: 'Reforecasted annual budget (with Q1 actuals)',
                createdBy: 'Sandra Henderson',
                workflow: 'Executive Approval',
                updated: '12/31/2012'
            },
            {
                Id: 5,
                name: 'Q3 Reforecast',
                description: '',
                createdBy: '',
                workflow: 'Not Started',
                updated: ''
            },
            {
                Id: 6,
                name: 'Q4 Reforecast',
                description: '',
                createdBy: '',
                workflow: 'Not Started',
                updated: ''
            }
        ];
      }
    };

  });
