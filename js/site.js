//get values from the page
//controller function
function getValues() {
    //get values from the page
    let loanAmount = document.getElementById("loanAmount").value;
    let payments = document.getElementById("payments").value;
    let rate = document.getElementById("rate").value; 

    //Need to validate input
    //parse into integers
    loanAmount = parseInt(loanAmount);
    payments = parseInt(payments);
    rate = parseInt(rate);

    let loan = {};
    loan.balance = loanAmount;
    loan.term = payments;
    loan.rate = rate;

    if (loanAmount > 0 && payments > 0 && rate > 0) {
        //call generateNumbers
        let loanObj = generateNumbers(loan);

        //call displayNumbers
        displayNumbers(loanObj);
    } else {
        alert("You must enter integers");
    }

}

//view function
function generateNumbers(loanObj) { 
    let monthlyPayment = ((loanObj.balance) * (loanObj.rate/1200)) / (1 -Math.pow(1 + (loanObj.rate/1200), -loanObj.term));

    let returnObj = {};
    returnObj.payment = monthlyPayment;
    returnObj.balance = loanObj.balance;
    returnObj.term = loanObj.term;
    returnObj.rate = loanObj.rate;

    return returnObj;
}

//view function
function displayNumbers(loanObj) { 
    //write to 'result table' section
    let templateRows = "";
    let balance = loanObj.balance;
    let totalInterest = 0;

    for (let index = 1; index <= loanObj.term; index++) { 
        let interest = balance * loanObj.rate/1200;
        let principal = loanObj.payment - interest;
        totalInterest = totalInterest + interest;
        balance = Math.abs(balance - principal);
        templateRows += `<tr><td>${index}</td><td>${loanObj.payment.toFixed(2)}</td><td>${principal.toFixed(2)}</td><td>${interest.toFixed(2)}</td><td>${totalInterest.toFixed(2)}</td><td>${balance.toFixed(2)}</td></tr>`;  
    }
    document.getElementById("results").innerHTML = templateRows;

    //write to 'payment output' section
    document.getElementById("monthlyPayments").innerHTML = `$${loanObj.payment.toFixed(2)}`;
    document.getElementById("totalPrincipal").innerHTML = `$${loanObj.balance.toFixed(2)}`;
    document.getElementById("totalInterest").innerHTML = `$${totalInterest.toFixed(2)}`;
    document.getElementById("totalCost").innerHTML = `$${(loanObj.balance + totalInterest).toFixed(2)}`;
}