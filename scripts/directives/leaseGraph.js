'use strict';

angular.module('cougarApp')
  .directive('leaseGraph', function () {
    var CG = {};

    CG.init = function() {
        //Grab test data
        $.get('/views/services/leases.html.json', function(data) {
            CG.data = data;
        }).done(function() {
            //When data is there, lets build the graph
            CG.buildGraph();
        });
    };

    CG.buildGraph = function() {
        //Sort list by StartDate first
        var sortedUnits = _.sortBy(CG.data, 'StartDate');
        //Then group by UnitUID
        var groupedUnits = _.groupBy(sortedUnits, 'UnitUID');
        //Get time frame
        var timeFrame = CG.timeFrame(sortedUnits);
        //Fill in units that are missing
        var filledList = CG.fillList(groupedUnits,timeFrame);
        //Build the foreground
        CG.buildForeground(timeFrame,filledList);
        //Buid the background
        CG.buildBackground(timeFrame);
    };

    CG.fillList = function(groupedUnits, timeFrame) {
        //Make a copy of object
        var list = _.extend(groupedUnits);
        var newList = [];
        var i = 0;
        _.each(list, function(unit) {

            _.each(unit,function(lease) {
                //Get the current unit
                var current = lease;
                //Get the index
                var index = _.indexOf(unit,lease);
                //GEt the next number
                var next = index + 1;

                //When does it start
                var currentStart = moment(current.StartDate);
                var currentStartMonth = moment(current.StartDate).month();
                var currentStartYear = moment(current.StartDate).year();

                var currentEnd = moment(current.EndDate);
                var currentEndMonth = moment(current.EndDate).month();
                var currentEndYear = moment(current.EndDate).year();
                
                if(unit[index - 1] !== undefined) {
                    var previousStart = moment(unit[index - 1].StartDate);
                    var previousStartMonth = moment(unit[index - 1].StartDate).month();
                    var previousStartYear = moment(unit[index -1].StartDate).year();
                    
                    var previousEnd = moment(unit[index - 1].EndDate);
                    var previousEndMonth = moment(unit[index - 1].EndDate).month();
                    var previousEndYear = moment(unit[index - 1].EndDate).year();
                }

                var formatString = 'YYYY-MM-DDTHH:mm:ssZ';

                var newStart, newEnd, newElement;
                //Check if there is not a lease at the first start date
                if(currentStart.year() === timeFrame.startYear) {
                    //If it is in the same year, is it at the start?
                    newStart = moment().set('year',timeFrame.startYear).set('month', 0).set('date',1).format(formatString);
                    newEnd = moment(currentStart).subtract('month',1).format(formatString);
                    newElement = {
                        Tenant: "Forcast Lease",
                        StartDate: newStart,
                        EndDate: newEnd
                    };
                    unit.push(newElement);
                }
                //Fill a space at the begining that spans more than one year
                else if(currentStart.year() !== timeFrame.startYear && unit[index - 1] === undefined){
                    newStart = moment().set('year',timeFrame.startYear).set('month', 0).set('date',1).format(formatString);
                    newEnd = moment(currentStart).subtract('month', 1).format(formatString);
                    newElement = {
                        Tenant: "Forcast Lease",
                        StartDate: newStart,
                        EndDate: newEnd
                    };
                    unit.push(newElement);
                }
                //Fill the spaces in between
                    //If the previous End year current Start yearhave a difference greater than 1
                else if(moment(currentStartYear).diff(previousStartYear) > 1
                    //If the month of the current col and the previous col is greater than 1
                    && moment(previousEndMonth).diff(currentStartMonth) > 1
                    //IF the year is the same as the last year
                    || moment(previousEndYear).diff(currentStartYear) === 0 
                    //But the month difference is greater then 1(ie may to june)
                    && moment(previousEndMonth).diff(currentStartMonth) > 1)  {
                    
                    var lastYear = moment(previousEndYear);
                    var lastMonth = moment(previousEnd).add('months',1).month();

                    newStart = moment().set('year', lastYear).set('month', lastMonth).set('date',1).format(formatString);
                    newEnd = moment(current.StartDate).subtract('months', 1).format(formatString);

                    newElement = {
                        Tenant: "Forcast Lease",
                        StartDate: newStart,
                        EndDate: newEnd
                    };
                    unit.push(newElement);
                }
                //Else check if the current unit's end date and the next units start date have a difference of more then 1
                else if(currentEnd.diff(unit[next].StartDate,'months') > 1 && moment(unit[next].StartDate).year() !== timeFrame.startYear){

                    newStart = currentEnd.add('months',1).format(formatString);
                    //need to tes to see if if new start year is greater then end year
                    newEnd = moment(unit[next].StartDate).subtract('months',1).format(formatString);
                    newEndYear = moment(newEnd).year();
                    if(newEndYear < timeFrame.startYear || newEndYear > timeFrame.endYear) {
                        newEnd = moment().set('year',timeFrame.endYear).set('month', 11);
                    }
                    newElement = {
                        StartDate: newStart,
                        EndDate: newEnd,
                        Tenant: "Forcast Lease"
                    };
                    unit.push(newElement);
                }
            });
            //Sort the units
            var newSort = _.sortBy(unit,"StartDate");
            newList[i] = newSort;
            i++;

        });
        console.log(newList);
        return newList;
    };

    CG.buildForeground = function(timeFrame,units) {
        var $container = $('.lease-graph-container .foreground');
        //Used for the html to be appended
        var $html = "";
        _.each(units,function(value, key, list){
            //Iterates once per unit in a group
            //Create a row
            $html += '<div class="unit-row" data-unit-id="' + key + '">';
            _.each(value,function(value, key, list){
                //Get the date and figure out how large to make the column
                var StartDate = moment(value.StartDate);
                var EndDate = moment(value.EndDate);
                //Get the number of months it takes up.
                var diff = EndDate.diff(StartDate,'months') + 1;
                var totalYears = timeFrame.years;
                var totalMonths = totalYears * 12;
                //Caculate the width based on the time frame.
                var width = Math.ceil((diff/totalMonths)*100);
                //Create a new column
                $html += '<div class="lease-bar" data-lease-id="' + value.UID + '"';
                $html += 'style="width: ' + width + '%"><div class="inner">';
                $html += value.Tenant + ' ' + diff +'<br />';
                $html += '<p> start: ' + StartDate.year() + ' '+ StartDate.month() +'</p>';
                $html += '<p> end : ' + EndDate.year() + ' ' + EndDate.month() + '</p>';
                $html += '</div></div>';
            });
            //Close row
            $html += '</div>';
        });
        //Append data to graph
        $container.append($html);
    };

    CG.buildBackground = function(timeFrame) {
        //Build the background columns
        //Based on time frame round up to have 4 quarters a year
        var $container =  $('.lease-graph-container .background');
        var $html = '';
        var colWidth = (100/timeFrame.years);
        var year = timeFrame.startYear;
        for(var i = 0; i < timeFrame.years; i++) {
            $html += '<div class="year-col" style="width:' + colWidth + '%">';
            $html += '<div class="year-info">';
            $html += '<p>'+ year +'</p>';
            $html += '</div>';
            $html += '<div class="quarter-info">';
            $html += '<div class="q1 quarter">q1</div>';
            $html += '<div class="q2 quarter">q2</div>';
            $html += '<div class="q3 quarter">q3</div>';
            $html += '<div class="q4 quarter">q4</div>';
            $html += '</div>';
            $html += '</div>';
            year++;
        }
        $container.append($html);
    };

    CG.timeFrame = function(sortedUnits) {
        //Last date in list
        var LastDate = 0;
        _.each(sortedUnits, function(value, key) {
            var date = moment(value.EndDate);
            if (LastDate === 0 || value.EndDate > LastDate) {
                LastDate = value.EndDate;
            }
        });
        LastDate = moment(LastDate);
        var FirstDate = sortedUnits[0].StartDate;
        var startYear = moment(FirstDate).year();
        var endYear = moment(LastDate).year();
        //Return object for number of months and years
        return {
            months: LastDate.diff(FirstDate,'months'),
            years: Math.ceil(LastDate.diff(FirstDate,'years',true)),
            startYear: startYear,
            endYear: endYear
        };
    };

    return {
      templateUrl: '/views/directives/leaseGraph.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //CG.init();
      }
    };
  });
