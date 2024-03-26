export default function ValidateExpenseFormat(expenseName, expenseAmount) {
    const nameRegex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/; // Regex to allow only characters and digits and spaces.
    if (!nameRegex.test(expenseName)) {
      return "Expense name can only contain characters and digits.";
    }
  
    if (parseFloat(expenseAmount) <= 0 || isNaN(parseFloat(expenseAmount))) {
      return "Expense amount must be a number above 0.";
    }
  
    return null;
  }