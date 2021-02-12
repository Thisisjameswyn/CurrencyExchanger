import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeCalc from './exchangeCalc.js';

function clearFields() {
  // $('#currencyOne').val("");
  // $('#currencyTwo').val("");
  $('#amount').val("");
}

function getElements(response, _curOne, _curTwo, _amount) {
  if (response.result == "success") {
    $('.showName').text(`The conversion rate from ${_curOne} to ${_curTwo} is : ${response.conversion_rate} for a total value of ${(_amount * response.conversion_rate).toFixed(2)}`);
  } else {
    $('.showErrors').text(`Uh-oh, something went wrong: ${response.message}`);
  }
}

$(document).ready(function() {
  $('#search').click(function() {
    let amount = parseInt($("#amount").val());
    const curOneText = $("#currencyOne option:selected").text();
    const curTwoText = $("#currencyTwo option:selected").text();
    const curOne = $("#currencyOne").val();
    const curTwo = $("#currencyTwo").val();
    clearFields();
    ExchangeCalc.getExRate(curOne, curTwo)
      .then(function(response) {
        getElements(response, curOneText, curTwoText, amount);
      });
  });
});