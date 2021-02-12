import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeCalc from './exchangeCalc.js';

function clearFields() {
  $('#currencyOne').val("");
  $('#currencyTwo').val("");
}

function getElements(response, _curOne, _curTwo) {
  if (response.result) {
    console.log(response.result);
    $('.showName').text(`The conversion rate from ${_curOne} to ${_curTwo} is : ${response.conversion_rate}`);
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

$(document).ready(function() {
  $('#search').click(function() {
    const curOneText = $("#currencyOne option:selected").text();
    const curTwoText = $("#currencyTwo option:selected").text();
    const curOne = $("#currencyOne").val();
    const curTwo = $("#currencyTwo").val();
    clearFields();
    ExchangeCalc.getExRate(curOne, curTwo)
      .then(function(response) {
        getElements(response, curOneText, curTwoText);
      });
  });
});