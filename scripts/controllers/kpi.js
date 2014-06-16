'use strict';

angular.module('cougarApp')
  .controller('KpiCtrl', function ($scope, KPI, $http, $sce, $stateParams, $filter) {
    $http({method: 'GET', url: '/tableau.php?view=views/StackingPlanChart/StackingPlanChart&EntityUID='+$filter('dashUid')($stateParams.Uid) }).success(function(data){
      $scope.tableau_url = data;
    });
    $scope.$sce = $sce;
    $scope.property.$promise.then(function(){
      if( _.filter(Object.keys($scope.property.CurrentModel), function(prop){ return prop.indexOf('KPI_') > -1; } ).length ){
        var kpi = $scope.property.CurrentModel;
        $scope.kpis = [
          {
            Name: 'Property Details',
            Values: {
            'Net Leasable Area': $filter('number')(kpi.KPI_NetLeasableArea),
            '# Floors': $filter('number')(kpi.KPI_Floors),
            '# Parking Spaces': $filter('number')(kpi.KPI_ParkingSpaces),
            'Property Valuation': $filter('currency')(kpi.KPI_Valuation, '$', 0)
            }
          },

          {
            Name: 'Debt',
            Values: {
              'LTV Ratio': kpi.KPI_LTVRatio,
              'DSC Ratio': kpi.KPI_DSCRatio
            }
          },

          {
            Name: 'Rent',
            Values: {
              'Gross Potential Rent (psf)': $filter('currency')(kpi.KPI_GrossPotentialRentPSF, '$', 2),
              'Gross Rent (psf)': $filter('currency')(kpi.KPI_GrossRentPSF, '$', 0),
              'Gross Potential vs Gross Rent Variance ($/psf)': $filter('currency')(kpi.KPI_GrossPotentialVsGrossRentVariancePSF, '$', 2),
              'Gross Potential vs Gross Rent Variance (%)': (kpi.KPI_GrossPotentialVsGrossRentVariancePCT)+'%',
              'Net Rent (psf)': $filter('currency')(kpi.KPI_NetRentPSF, '$', 2),
              'Gross vs Net Rent Variance ($/psf)': $filter('currency')(kpi.KPI_GrossVsNetRentVariancePSF, '$', 2),
              'Gross vs Net Rent Variance (%)': kpi.KPI_GrossVsNetRentVariancePCT ? kpi.KPI_GrossVsNetRentVariancePCT+'%' : 0
            }
          },

          {
            Name: 'Area',
            Values: {
              'Occupied Area': $filter('number')(kpi.KPI_OccupiedArea),
              'Expiring Area': $filter('number')(kpi.KPI_ExpiringArea),
              'Occupancy': $filter('number')(kpi.KPI_Occupancy)+'%',
              'Total Area': $filter('number')(kpi.KPI_OccupiedArea)
            }
          },

          {
            Name: 'Recoveries',
            Values: {
            'Recovery Revenue': $filter('currency')(kpi.KPI_RecoveryRevenue, '$', 0),
            'Recoverable Expenses': $filter('currency')(kpi.KPI_RecoverableExpense, '$', 0),
            'Recovery Ratio': $filter('number')(kpi.KPI_RecoveryRatio)+'%'
            }
          },

          {
            Name: 'Revenue',
            Values: {
              'NOI': $filter('currency')(kpi.KPI_NOI, '$', 0),
              'Less: Capex': $filter('currency')(kpi.KPI_LessCapex, '$', 0),
              'NCF after Capex': $filter('currency')(kpi.KPI_NCFAfterCapex, '$', 0),
              'Less: Debt Service': $filter('currency')(kpi.KPI_LessDebtService, '$', 0),
              'NCF after Debt Service': $filter('currency')(kpi.KPI_NCFAfterDebtService, '$', 0)
            }
          }
        ];
      } else if($scope.isDemo) {
        $scope.kpis = KPI.kpis();
      }
    });
  });
