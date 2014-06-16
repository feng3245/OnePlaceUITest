'use strict';

angular.module('cougarApp')
  .factory('KPI', function ($filter) {
    return {
      kpis: function(){
        return [
          {
            Name: 'Property Details',
            Values: {
            'Net Leasable Area': $filter('number')(Faker.Helpers.randomNumber(100000)),
            '# Floors': $filter('number')(Faker.Helpers.randomNumber(9)),
            '# Parking Spaces': $filter('number')(Faker.Helpers.randomNumber(100)),
            'Property Valuation': $filter('currency')(Faker.Helpers.randomNumber(900000), '$', 0)
            }
          },

          {
            Name: 'Debt',
            Values: {
              'LTV Ratio': Faker.Helpers.randomNumber(99)/100,
              'DSC Ratio': Faker.Helpers.randomNumber(99)/100
            }
          },

          {
            Name: 'Rent',
            Values: {
              'Gross Potential Rent (psf)': $filter('currency')(Faker.Helpers.randomNumber(9)+1, '$', 2),
              'Gross Rent (psf)': $filter('currency')(Faker.Helpers.randomNumber(10), '$', 0),
              'Gross Potential vs Gross Rent Variance ($/psf)': $filter('currency')(Faker.Helpers.randomNumber(2)+1, '$', 2),
              'Gross Potential vs Gross Rent Variance (%)': (Faker.Helpers.randomNumber(10)/10*-1)+'%',
              'Net Rent (psf)': $filter('currency')(Faker.Helpers.randomNumber(5)+1, '$', 2),
              'Gross vs Net Rent Variance ($/psf)': $filter('currency')(Faker.Helpers.randomNumber(5)+1, '$', 2),
              'Gross vs Net Rent Variance (%)': (Faker.Helpers.randomNumber(10)/10*-1)+'%'
            }
          },

          {
            Name: 'Area',
            Values: {
              'Occupied Area': $filter('number')(Faker.Helpers.randomNumber(250000)),
              'Expiring Area': $filter('number')(Faker.Helpers.randomNumber(50000)),
              'Occupancy': $filter('number')(Faker.Helpers.randomNumber(100))+'%',
              'Total Area': $filter('number')(Faker.Helpers.randomNumber(200000))
            }
          },

          {
            Name: 'Recoveries',
            Values: {
            'Recovery Revenue': $filter('currency')(Faker.Helpers.randomNumber(20000), '$', 0),
            'Recoverable Expenses': $filter('currency')(Faker.Helpers.randomNumber(30000), '$', 0),
            'Recovery Ratio': $filter('number')(Faker.Helpers.randomNumber(100))+'%'
            }
          },

          {
            Name: 'Revenue',
            Values: {
              'NOI': $filter('currency')(Faker.Helpers.randomNumber(100000), '$', 0),
              'Less: Capex': $filter('currency')(Faker.Helpers.randomNumber(20000), '$', 0),
              'NCF after Capex': $filter('currency')(Faker.Helpers.randomNumber(20000), '$', 0),
              'Less: Debt Service': $filter('currency')(Faker.Helpers.randomNumber(40000), '$', 0),
              'NCF after Debt Service': $filter('currency')(Faker.Helpers.randomNumber(60000), '$', 0)
            }
          }
        ];
      }
    };
  });
