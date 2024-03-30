import React, { useContext, useState,useMemo} from "react"
import axios from "axios";

const BASE_URL_EXPENSES = "http://localhost:3001/expenses/";
const BASE_URL_INCOMES = "http://localhost:3001/incomes/";
const BASE_URL_CATEGORIES = "http://localhost:3001/categories/";
const BASE_URL_INCOMES_CATEGORIES = "http://localhost:3001/incomescategories/";


const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {

    const [expenses,setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [categories,setCategories] = useState([]);
    const [incomeCategories,setIncomeCategories] = useState([]);

    const [expensesPerCategory,setExpensesPerCategory] = useState([]);
    const [incomesPerCategory,setIncomesPerCategory] = useState([]);

    const currentYear = new Date().getFullYear();
    const [expensesYear, setExpensesYear] = useState(currentYear);
    const [expensesTotalForMonthes,setExpensesTotalForMonths] = useState([]);
    const [incomeTotalForMonthes, setIncomeTotalForMonths] = useState([]);

    const getAllExpenses = async () => {
        try{
            const response = await axios.get(BASE_URL_EXPENSES)
            setExpenses(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    const getAllCategories = async () => {
        try{
            const response = await  axios.get(BASE_URL_CATEGORIES)
            setCategories(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }
    const getExpensesPerCategory = async () => {
        try{
            const response = await  axios.get(`${BASE_URL_EXPENSES}counter-per-category`)
            setExpensesPerCategory(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }
    const addExpense = async (expense) => {
        try{
            await axios.post(BASE_URL_EXPENSES,expense);
            getAllExpenses();
        }
        catch(error){
            console.log(error.message);
        }
    }
    const deleteExpense = async (expenseId) => {
        try{
            await axios.delete(`${BASE_URL_EXPENSES}/${expenseId}`);
            getAllExpenses();
        }
        catch(error){
            console.log(error.message);
        }
    }

    const getSumExpensesPerMonthForYear = async() => {
        try{
            const response = await axios.post(`${BASE_URL_EXPENSES}sum-expenses-per-month`,{year:expensesYear});
            setExpensesTotalForMonths(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    const getAllIncomes = async () => {
        try{
            const result = await axios.get(BASE_URL_INCOMES);
            setIncomes(result.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    const addIncome = async (income) => {
        try{
            await axios.post(BASE_URL_INCOMES, income);
            getAllIncomes();
        }
        catch(error){
            console.log(error.message);
        }

    }
    const deleteIncome = async (incomeId) => {
        await axios.delete(`${BASE_URL_INCOMES}/${incomeId}`)
        getAllIncomes();
    }

    const getIncomesPerCategory = async () => {
        try
        {
            const response = await axios.get(`${BASE_URL_INCOMES}/counter-per-category`)
            setIncomesPerCategory(response.data);
        }
        catch(error)
        {
            console.log(error.message);
        }

    }
    const getSumIncomesPerMonthForYear = async () => {
        try{
            const response = await axios.post(`${BASE_URL_INCOMES}/sum-incomes-per-month`, {year:expensesYear})
            setIncomeTotalForMonths(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    const getAllIncomeCategories = async () => {
        try{
            const result = await axios.get(BASE_URL_INCOMES_CATEGORIES);
            setIncomeCategories(result.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    const addIncomeCategory = async (category) => {
        try{
            await axios.post(BASE_URL_INCOMES_CATEGORIES, category)
            getAllIncomeCategories();
        }
        catch(error){
            console.log(error.message);
        }
    }
    const addExpenseCategory = async (category) => {
        try{
            await axios.post(BASE_URL_CATEGORIES, category)
            getAllCategories();
        }
        catch(error){
            console.log(error.message);
        }
    }

    const deleteExpenseCategory = async (categoryId) => {
        try{
            await axios.delete(`${BASE_URL_CATEGORIES}${categoryId}`)
            getAllCategories();
        }
        catch(error){
            console.log(error.message);
        }
    }
    const updateExpenseCategory = async (categoryId,type,color) => {
        try{
            await axios.put(`${BASE_URL_CATEGORIES}${categoryId}`, {type:type, color:color})
            getAllCategories();
        }
        catch(error){
            console.log(error.message);
        }
    }

    const deleteIncomeCategory = async (categoryId) => {
        try{
            await axios.delete(`${BASE_URL_INCOMES_CATEGORIES}${categoryId}`)
            getAllIncomeCategories();
        }
        catch(error){
            console.log(error.message);
        }
    }

    const updateIncomeCategory = async (categoryId,type,color) => {
        try{
            await axios.put(`${BASE_URL_INCOMES_CATEGORIES}${categoryId}`, {type:type, color:color})
            getAllIncomeCategories();
        }
        catch(error){
            console.log(error.message);
        }
    }


    useMemo(() => {
        getAllExpenses();
        getAllCategories();
        getExpensesPerCategory();
        getAllIncomes();
        getAllIncomeCategories();
        getIncomesPerCategory();
    },[])

    useMemo(() => {
        if(expensesYear){
            getSumExpensesPerMonthForYear(expensesYear);
            getSumIncomesPerMonthForYear(expensesYear);
        }
    },[expensesYear])
    
    return (
        <GlobalContext.Provider value={{
            getAllCategories,
            getAllExpenses,
            categories,
            expenses,
            incomes,
            incomeCategories,
            expensesPerCategory,
            addExpense,
            deleteExpense,
            expensesYear,
            setExpensesYear,
            expensesTotalForMonthes,
            incomeTotalForMonthes,
            incomesPerCategory,
            addIncome,
            deleteIncome,
            addIncomeCategory,
            addExpenseCategory,
            deleteExpenseCategory,
            deleteIncomeCategory,
            updateIncomeCategory,
            updateExpenseCategory
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}