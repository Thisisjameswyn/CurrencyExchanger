export default class ExchangeCalc {
  static getExRate(firstCur, secondCur) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${firstCur}/${secondCur}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}