'use strict';

angular.module('cougarApp')
.controller('LoanDetailsCtrl', function ($scope, $anchorScroll, $location) {
    $scope.loanData = {
      "Loan Name":"Legacy Park Office",
      "Is active":"TRUE",
      "Loan code":12345,
      "Is Speculative":"FALSE",
      "Display Name":"12345 - Legacy Park Office",
      "Mortgage Number":90991,
      "Other ID":"5A",
      "Description (Mortgage Type)":"1st mortgage with refi available in 2015",
      "Comments":"First time using this lender",
      "Other Information 1":"None",
      "Other Information 2":"None",
      "Lender (s)":"Standard Life",
      "Lender Alias":"Standard",
      "Servicer / Agent":"John Doe",
      "Borrower":"Atlantic Development",
      "Mortgage Supplier Number":55591,
      "Appraised Value at Funding":"$10,000,000 ",
      "Property Value at Maturity":"$25,000,000 ",
      "Original Amortization Period":300,
      "Original Loan Amount":" 13,000,000.00 ",
      "Portfolio or CMBS":" Portfolio ",
      "Assumed Loan":" TRUE ",
      "Currency":"CAD  - Canadian Dollar",
      "Loan Balance at Maturity":9500000,
      "Assumed / Funded Loan Amount":" 13,000,000.00 ",
      "Current Balance":12500000,
      "Loan Type":"1st Mortgage",
      "Additional Drawdowns":0,
      "Assumption / Funded Date":"6/1/2009",
      "Funded / Assumed Term":"5 Years",
      "Drawdown Date":"6/1/2009",
      "Maturity Date":"6/1/2014",
      "First Payment Date":"7/1/2009",
      "Start Date":"6/1/2009",
      "Charge":"DREVAL - Debt Reval",
      "Market Value":" 15,000,000 ",
      "Outcome":" 18,000,000 ",
      "Balance":null,
      "Yield Curve 1":"GOC 5 Year",
      "Drawdown Fee":20.000,
      "Non-Utilization Fee":500,
      "Non-Utilization paid frequency":"Monthly ",
      "Line Fee":5.000,
      "Line Fee paid frequency":"Monthly ",
      "Future Consent and Admin Fees":"Commitment Fee - $50,000 (refundable), Loan Processing Fee $15,000 (non-refundable)",
      "Commitment Letter Supercedes Docs":"Yes - terms of commitment govern over loan documents in the event of an inconsistency.  For greater clarity, the loan documents shall be deemed to be inconsistent with the Commitment to the extent they impose any greater restrictions or more onerous obligations on the Borrower.",
      "Calculation":"Fixed",
      "Max Rate":"8%",
      "Rate (%pa)":"5.4560%",
      "Min Rate":"5.0000%",
      "Reference Rate":"N/A",
      "Month End Accrual":"TRUE",
      "Margin (%pa)":"N/A",
      "Current Rate":"5.4560%",
      "Method":"Effective (Semi-Annual Compounded)",
      "Current Interest":135.280,
      "Yield Curve 2":"GOC - Government of Canada",
      "All in Rate":"5.4560%",
      "Spread":"CS - Credit Spread",
      "Prepayement Spread":"2.50%",
      "Calculate Prepayment Penalty":"TRUE",
      "Min Prepayment Penalty":"1%",
      "Lock-Out Start Date":"6/30/2013",
      "Lock-Out Period End Date":"6/30/2020",
      "Closed Period Start Date":"1/1/2015",
      "Closed Period End Date":"12/31/2018",
      "Open Period Start Date":"5/1/2013",
      "Open Period End Date":"12/31/2019",
      "Prepayment Penalty (Y/N)":"TRUE",
      "Early Repayment Date":"N/A",
      "Prepayment Penalty Description":"The Borrower has the right to prepay all (but not less than all) of the Principal Amount of the Loan on any Payment Date prior to the Defeasance of the Loan upon payment to the Lender of the Prepayment Charge and provided: (i) the Borrower gives the Lender not less than 30 days prior written notice of such prepayment (which notice shall be irrevocable by the Borrower and shall specify the Payment Date on which such prepayment will be made); and (ii) in addition to the Prepayment Charge, the Borrower concurrently pays to the Lender all accrued and unpaid interest up to and including such Payment Date and all other outstanding Loan Indebtedness. (s. 3.08, Charge) (Note: this Section is consistent with Section A, p. 2 of the Commitment)",
      "Prepayment Penalty Calculation":"N/A",
      "Prepayment Terms/Release Provisions":"None",
      "Yield Maintenance Calculation 1":"If the Bond Yield (as hereinafter defined) is less than the rate of interest stipulated in this Mortgage, a prepayment bonus",
      "Yield Maintenance Calculation 2":"present value, discounted by the Bond Yield (assuming compounding semi- annually not in advance) from the date of  prepayment to the Maturity Date, of the following difference: (a) the principal balance that would have been outstanding as at the Maturity Date had all monthly instalments of principal and interest been made throughout the Term of this Mortgage when due under the Mortgage and (b) the principal balance that would have been outstanding as at the stipulated maturity date of the Term of the Mortgage had the interest rate under the Mortgage from and after the date of such prepayment been equivalent to the Bond Yield and all of the monthly instalments of principal and interest been made throughout the Term of the Mortgage",
      "YM - Discount Rate Description":"The ''Bond Yield'' means the yield, as determined by the Mortgagee, on a Government of Canada bond having a maturity equivalent to the remaining Term of this Mortgage, or, failing the existence of such bond, determined as if such bond existed, which yield is to be determined at mid-day, Toronto time, on the second (2 nd) day prior to the date stipulated in the Prepayment Notice as the date on which the prepayment will be made.'",
      "YM - Financial Instrument Description":"The Government of Canada Yield with respect to any proposed redemption of the Bonds will be determined as at the applicable Redemption Price Determination Date by two Investment Dealers selected by the Issuers who will confer with the Issuers as to such\ndetermination and will report jointly to the Issuers and the Trustee the percentage figure they have agreed upon or, failing such agreement, the arithmetic average of the respective percentages determined by each, and such agreed percentage or average, as the case may be, will be the Government of Canada Yield for the purposes hereof",
      "Grace Period (Days)":10,
      "Extensions on Loan (Y/N)":"TRUE",
      "Number of Extensions":2,
      "Extension 1 Date":"12/31/2019",
      "Extension 1 Description":"Subject to Lender Approval",
      "Default Rate":0,
      "Default Rate Description":"N/A",
      "Late Charge Rate":"N/A",
      "Late Charge Description":"N/A"
   };

    var fields = 'Loan Name,Is active,Loan code,Is Speculative,Display Name,Mortgage Number,Other ID,Description (Mortgage Type),Comments,Other Information 1,Other Information 2,Lender (s),Lender Alias,Servicer / Agent,Borrower,Mortgage Supplier Number,Appraised Value at Funding,Property Value at Maturity,Original Amortization Period,Original Loan Amount,Portfolio or CMBS,Assumed Loan,Currency,Loan Balance at Maturity,Assumed / Funded Loan Amount,Current Balance,Loan Type,Additional Drawdowns,Assumption / Funded Date,Funded / Assumed Term,Drawdown Date,Maturity Date,First Payment Date,Start Date,Charge,Market Value,Outcome,Balance,Yield Curve 1,Drawdown Fee,Non-Utilization Fee,Non-Utilization paid frequency,Line Fee,Line Fee paid frequency,Future Consent and Admin Fees,Commitment Letter Supercedes Docs,Calculation,Max Rate,Rate (%pa),Min Rate,Reference Rate,Month End Accrual,Margin (%pa),Current Rate,Method,Current Interest,Yield Curve 2,All in Rate,Spread,Prepayement Spread,Calculate Prepayment Penalty,Min Prepayment Penalty,Lock-Out Start Date,Lock-Out Period End Date,Closed Period Start Date,Closed Period End Date,Open Period Start Date,Open Period End Date,Prepayment Penalty (Y/N),Early Repayment Date,Prepayment Penalty Description,Prepayment Penalty Calculation,Prepayment Terms/Release Provisions,Yield Maintenance Calculation 1,Yield Maintenance Calculation 2,YM - Discount Rate Description,YM - Financial Instrument Description,Grace Period (Days),Extensions on Loan (Y/N),Number of Extensions,Extension 1 Date,Extension 1 Description,Default Rate,Default Rate Description,Late Charge Rate,Late Charge Description'.split(',');

    var fromTo = function(from, to){
        return fields.slice(fields.indexOf(from), fields.indexOf(to) + 1);
    };

    $scope.loanDetails = [
        {
            Title: 'Loan Details',
            Fields: fromTo('Loan Name', 'Assumed Loan')
        },
        {
            Title: 'Principal',
            Fields: fromTo('Currency', 'Additional Drawdowns')
        },
        {
            Title: 'Term (Original & Assumed)',
            Fields: fromTo('Assumption / Funded Date', 'Funded / Assumed Term')
        },
        {
            Title: 'Valuation Events',
            Fields: fromTo('Start Date', 'Yield Curve 1')
        },
        {
            Title: 'Fees',
            Fields: fromTo('Drawdown Fee', 'Commitment Letter Supercedes Docs')
        },
        {
            Title: 'Interest Calculation',
            Fields: fromTo('Calculation', 'Method')
        },
        {
            Title: 'Yield Maintenance & Valuation Parameters',
            Fields: fromTo('Yield Curve 2', 'YM - Financial Instrument Description')
        },
        {
            Title: 'Extensions',
            Fields: fromTo('Grace Period (Days)', 'Extension 1 Description')
        },
        {
            Title: 'Default & Late Charges',
            Fields: fromTo('Default Rate', 'Late Charge Description')
        }
    ];

    $scope.abstractDetails = _.shuffle($scope.loanDetails);

    $scope.$parent.bookmarks = _.map($scope.loanDetails, function(l){ return l.Title; });

    $scope.$parent.scrollTo = function(bm) {
      console.log(bm);
      $location.hash(bm);
      $anchorScroll();
    };
  });
