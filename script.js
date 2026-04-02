const converterForm = document.getElementById("converter-form");
const formCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

window.addEventListener("load", fetchCurrencies);

converterForm.addEventListener("submit", convertCurrencies);

async function fetchCurrencies() {
  // https://api.exchangerate-api.com/v4/latest/USD

  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD",
  );
  const data = await response.json();

  const currencyOptions = Object.keys(data.rates);

  currencyOptions.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    formCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

async function convertCurrencies(e) {
  //   console.log("submit");
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const formCurrencyValue = formCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (amount < 0) {
    alert("Please enter a valid amount");
    return;
  }

  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${formCurrencyValue}`,
  );

  const data = await response.json();

  const rate = data.rates[toCurrencyValue];

  const convertedAmount = (rate * amount).toFixed(2);

  resultDiv.textContent = `${amount} ${formCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}
