const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultElement = document.getElementById("result");
const errorMessage = document.getElementById("error-message");
const converterForm = document.getElementById("converter-form");

async function getCountries() {
  const url =
    "https://api.restcountries.com/countries/v5" +
    "?response_fields=names.common,currencies,flag.emoji" +
    "&limit=100&offset=0" +
    "&api-key=" +
    REST_COUNTRIES_API_KEY +
    "&pretty=1";

  try {
    const response = await fetch(url);
    const responseData = await response.json();

    const countries = responseData.data.objects;

    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      const currencies = country.currencies || [];

      for (let j = 0; j < currencies.length; j++) {
        const currency = currencies[j];

        const currencyCode = currency.code || currency.currency_code;
        const currencyName = currency.name || currency.currency_name;

        if (!currencyCode) {
          continue;
        }
        function createCurrencyOption(currencyCode, currencyName, flag) {
            const option = document.createElement("option");
            option.value = currencyCode;
            option.textContent = currencyCode + " - " + currencyName + " " + flag;
            return option;
        }

        fromCurrency.appendChild(
            createCurrencyOption(currencyCode, currencyName, country.flag.emoji)
        );

        toCurrency.appendChild(
            createCurrencyOption(currencyCode, currencyName, country.flag.emoji)
        );
    }
    }

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (error) {
    console.error(error);
    errorMessage.classList.remove("hidden");
  }
}
async function convertCurrency(event) {
  event.preventDefault();

  resultElement.classList.add("hidden");
  errorMessage.classList.add("hidden");

  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = amountInput.value;

  const url =
    "https://v6.exchangerate-api.com/v6/" +EXCHANGE_RATE_API_KEY +"/pair/" +from +"/" +to +"/" +amount;

  try {
    const response = await fetch(url);
    const data = await response.json();

    resultElement.textContent =amount +" " +from +" = " +data.conversion_result +" " +to;

    resultElement.classList.remove("hidden");
  } catch (error) {
    errorMessage.classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  converterForm.addEventListener("submit", convertCurrency);
  getCountries();
});