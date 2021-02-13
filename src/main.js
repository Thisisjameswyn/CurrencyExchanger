import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeCalc from './exchangeCalc.js';

function clearFields() {
  $('#amount').val("");
}

function getElements(response, _curOneText, _curTwoText, _amount, outPut) {
  if (response.result == "success") {
    $('.showConv').text(`The conversion rate from ${_curOneText} to ${_curTwoText} is : ${response.conversion_rate} for a total value of ${(_amount * response.conversion_rate).toLocaleString('en',{ style: 'currency', currency: outPut})}`);
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
    if(isNaN(amount)) {
      $(alert("please enter an amount"));
      location.reload();
    }
    clearFields();
    ExchangeCalc.getExRate(curOne, curTwo)
      .then(function(response) {
        getElements(response, curOneText, curTwoText, amount, curTwo);
      });
  });
});
    