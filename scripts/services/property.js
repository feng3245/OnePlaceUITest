'use strict';

angular.module('cougarApp')
  .factory('Property', function ($resource, PortfolioProperty, cougarConfig, $rootScope) {
    var Property = $resource('services/properties/:Uid', { currmodel: $rootScope.activeModel.Code }, {
      'query': {
        method: 'GET',
        transformResponse: function(data){ return angular.fromJson(data).Data; },
        isArray: true
      },
      'get': {
        method: 'GET',
        transformResponse: function(data){ return angular.fromJson(data).Data; },
        isArray: false
      },
      'update': {
        method: 'PUT',
        transformResponse: function(data){ return angular.fromJson(data).Data; }
      }
    });

    Property.prototype.hasPortfolio = function(portfolio_id){
      return _.indexOf(this.PortfolioIds, portfolio_id) !== -1;
    };

    Property.prototype.togglePortfolio = function(portfolio_id){
      var relation = new PortfolioProperty({
        property_id: this.Id,
        portfolio_id: portfolio_id
      });
      var index = _.indexOf(this.PortfolioIds, portfolio_id);
      if(index > -1){
        this.PortfolioIds.splice(index, 1);
        relation.$delete();
      } else {
        this.PortfolioIds.push(portfolio_id);
        relation.$save();
      }
      console.log(this.PortfolioIds);
    };

    Property.prototype.workflow_status = function(){
      var status = _.sample([
        { Valuation: 'Not Started', Budget: 'Submitted' },
        { Valuation: 'Submitted' },
        { Budget: 'In Progress' },
        { Valuation: 'In Progress', Budget: 'Approved' },
        { Valuation: 'Rejected' }
      ], 1);
      return status;
    };

    Property.prototype.randomPictureUrl = function(){
      if(this.ImgPath){
        return cougarConfig.API_HOST+'/Content/images/thumbnail-'+this.ImgPath;
      } else {
        return '/styles/images/stock/'+_.random(1, 7)+'.jpg';
      }
    };

    Property.prototype.defaultPictureUrl = function(){
      if(this.ImgPath){
        return cougarConfig.API_HOST+'/Content/images/thumbnail-'+this.ImgPath;
      } else {
        return '/styles/images/placeholder.png';
      }
    };

    Property.prototype.getPictureUrl = function(){
      return $rootScope.isDemo ? Property.prototype.randomPictureUrl.call(this) : Property.prototype.defaultPictureUrl.call(this);
    };

    return Property;
  })
  .factory('PortfolioProperty', function($resource){
    return $resource('services/portfolios/:portfolio_id/properties/:property_id', {
      portfolio_id: '@portfolio_id',
      property_id: '@property_id'
    }, {});
  });
