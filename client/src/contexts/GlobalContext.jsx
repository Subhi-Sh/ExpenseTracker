import React, { useContext, useState,useMemo} from "react"
import axios from "axios";

const BASE_URL_EXPENSES = "http://localhost:3001/expenses/";
const BASE_URL_CATEGORIES = "http://localhost:3001/categories/";


const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {

    const [expenses,setExpenses] = useState([]);
    const [categories,setCategories] = useState([]);
    const [expensesPerCategory,setExpensesPerCategory] = useState([]);
    const [lastExpenses,setLastExpenses] = useState([]);
    const [lastExpensesAmount,setLastExpensesAmount] = useState(3);
    const currentYear = new Date().getFullYear();
    const [expensesYear, setExpensesYear] = useState(currentYear);
    const [expensesTotalForMonthes,setExpensesTotalForMonths] = useState([]);

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

    const getLastAmountExpenses = async  () => {
        try{
            const response =  await axios.get(`${BASE_URL_EXPENSES}/last/${lastExpensesAmount}`)
            console.log(response.data);
            setLastExpenses(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    const addExpense = async (expense) => {
        try{
            const response = await axios.post(BASE_URL_EXPENSES,expense);
            console.log(response.data);
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
        console.log("expenses year = ", expensesYear);
        try{
            const response = await axios.post(`${BASE_URL_EXPENSES}sum-expenses-per-month`,{year:expensesYear});
            console.log(`${BASE_URL_EXPENSES}sum-expenses-per-month`);
            console.log("expensesTotals", response.data);
            setExpensesTotalForMonths(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    useMemo(() => {
        getAllExpenses();
        getAllCategories();
        getExpensesPerCategory();
        getLastAmountExpenses();
    },[])

    useMemo(() => {
        if(expensesYear){
            getSumExpensesPerMonthForYear(expensesYear);
        }
    },[expensesYear])
    
    return (
        <GlobalContext.Provider value={{
            getAllCategories,
            getAllExpenses,
            categories,
            expenses,
            expensesPerCategory,
            lastExpenses,
            setLastExpensesAmount,
            addExpense,
            deleteExpense,
            expensesYear,
            setExpensesYear,
            expensesTotalForMonthes
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}