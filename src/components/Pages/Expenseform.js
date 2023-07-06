import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import classes from "./Expenseform.module.css";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const Expenseform = () => {
const [Expenses,setExpenses]=useState([])
const [selectedExpense, setSelectedExpense] = useState(null);

// 
    const getdata =async ()=>{
        try{
            const res =await fetch("https://expense-tracker-8c9e9-default-rtdb.firebaseio.com/Expenses.json")
            const data= await res.json();
          const arraydata=[];
          for(let key in data){
            arraydata.push({
                Amount:data[key].Amount,
                Description:data[key].Description,
                Category:data[key].Category,
                key:key
            })
          }
        setExpenses(arraydata)

        }
        catch(err){
         toast.error(err.message)
        }

    }

    useEffect (()=>{
        getdata();
    },[])

    // 
    console.log("this is expenses",Expenses)

    const submithandler=async (e)=>{
        e.preventDefault();
        const expense ={
            Description:e.target.Description.value,
            Amount:e.target.Amount.value,
            Category:e.target.Category.value 
        }
        

         const postdata=async ()=>{

            try{
                const res = await  fetch("https://expense-tracker-8c9e9-default-rtdb.firebaseio.com/Expenses.json",{
                    method:"POST",
                    body:JSON.stringify(expense),
                        headers:{
                            'Content-Type': 'application/json'
                     }
                })
    
    
                const data=res.json();
                if(res.ok){
                    getdata();
                }else{
                    throw Error(data.error.message)
                }
            }catch(err){
                toast.error(err.message)
            }
           
         }
         postdata();
         
    }

    // 
    const deleteHandler =async (key)=>{
   try{
       const res =await fetch(`https://expense-tracker-8c9e9-default-rtdb.firebaseio.com/Expenses/${key}.json`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
       })

      const data =await res.json();
      if(res.ok){
       toast.success("item delete successfully")
       getdata();
      }else{
        throw Error(data.error.message)
      }
   }catch(err){
    toast.error(err.message)
   }
    }


    const EditHandler =async (key)=>{
      const expense = Expenses.find((item) => item.key === key);
      setSelectedExpense(expense);
       }
    // 


    const Expensesdatalist = Expenses && Expenses.map((item) => (
        <>
        <tr className={classes.tablerow}>
            <td>{item.Description}</td>
            <td>{item.Amount}</td>
            <td>{item.Category}</td>
            <td><button onClick={EditHandler.bind(null,item.key)}>Edit</button></td>
            <td><button onClick={deleteHandler.bind(null,item.key)}>Delete</button></td>
        </tr>
        </>
    ));


  return (
    <>
      <form className={classes.form} onSubmit={submithandler}>
        <h1 style={{ textAlign: "center" }}>Expenses</h1>
        
        <Input
          lable={"Amount"}
          input={{
            type: "number",
            name: "Amount",
            id: "Amount",
            placeholder: "Amount",
            value: selectedExpense ? selectedExpense.Amount : "",
          }}
        ></Input>
        <Input
          lable={"Description"}
          input={{
            type: "text",
            name: "Description",
            id: "Description",
            placeholder: "Description",
            value: selectedExpense ? selectedExpense.Description : "",
          }}
        ></Input>
        <select  className={classes.select} name="Category">
          <option value="Food">Food</option>
          <option value="Electronic">Electronic</option>
          <option value="Beauty">Beauty</option>
        </select>

        <div>
          <button className={classes.btn} type="submit">
            Add Expenses
          </button>
        </div>
      </form>

<table>
    <thead>
        <th>Description</th>
        <th>Amount</th>
        <th>Category</th>
        <th>x</th>
        <th>x</th>
    </thead>
    <tbody>
        {Expensesdatalist }
    </tbody>
</table>
      <ToastContainer  className="toast-container"/>

    </>
  );
};

export default Expenseform;
