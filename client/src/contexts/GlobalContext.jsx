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
    const [lastExpensesAmount,setLastExpensesAmount] = useState(5);

    
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
            const response = await  axios.get(`${BASE_URL_CATEGORIES}counter-per-category`)
            setExpensesPerCategory(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    const getLastAmountExpenses = async  () => {
        try{
            const response =  await axios.get(`${BASE_URL_EXPENSES}/last/${lastExpensesAmount}`)
            setLastExpenses(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useMemo(() => {
        getAllExpenses();
        getAllCategories();
        getExpensesPerCategory();
        getLastAmountExpenses();
    },[])
    
    return (
        <GlobalContext.Provider value={{
            getAllCategories,
            getAllExpenses,
            categories,
            expenses,
            expensesPerCategory,
            lastExpenses,
            setLastExpensesAmount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}