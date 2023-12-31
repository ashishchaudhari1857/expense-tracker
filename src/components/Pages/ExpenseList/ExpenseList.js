import React from 'react';
import { useRef ,useEffect } from 'react';
import classes from '../Expenseform.module.css'
import { useSelector ,useDispatch } from "react-redux";
import { ExpenseActions } from '../slices/ExpenseSlice';
import { ThemeActions } from '../slices/Themeslice';
import { Link, Route } from 'react-router-dom';
const ExpenseList = (props) => {
    const Expenses =useSelector((state)=>state.Exp.expenses);
  const totalAmount =useSelector((state)=>state.Exp.totalAmount);
  const dispatch=useDispatch();
  
 


  const Expensesdatalist =
    Expenses &&
    Expenses.map((item) => (
      <>
        <tr className={classes.tablerow} key={item.key} >
          <td>{item.Description}</td>
          <td>{item.Amount}</td>
          <td>{item.Category}</td>
          <td>
            <button onClick={()=>{props.EditHandler(item.key)}}>Edit</button>
          </td>
          <td>
            <button onClick={()=>{props.deleteHandler( item.key)}}>Delete</button>
          </td>
        </tr>
      </>
    ));
  return (
    <>
    <table>
        <thead>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th>x</th>
          <th>x</th>
        </thead>
        <tbody>{Expensesdatalist}
        <tr>
          <td colSpan={3}>Total</td>
          <td colSpan={2}>{totalAmount} Rs</td>
        </tr>
        </tbody>
      </table>

    { totalAmount > 10000  &&  <button onClick={()=>dispatch(ThemeActions.premium())} className={classes.btn}> Click for Premium</button>}
    </>
  );
};

export default ExpenseList;