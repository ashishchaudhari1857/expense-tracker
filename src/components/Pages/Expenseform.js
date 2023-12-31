import React, { useEffect, useState ,useRef} from "react";
import Input from "../UI/Input";
import classes from "./Expenseform.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector ,useDispatch } from "react-redux";
import { ExpenseActions } from "./slices/ExpenseSlice";
import ExpenseList from "./ExpenseList/ExpenseList";
import { ThemeActions } from "./slices/Themeslice";
const Expenseform = () => {
  const downloadLinkRef = useRef(null);
  const Expenses =useSelector((state)=>state.Exp.expenses);
  const themeChanger =useSelector((state)=>state.Theme.themeChanger)
  const dispatch=useDispatch();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [selectedexpens, setselectedexpense] = useState(null);
const id=useSelector((state)=>state.Auth.userid)
console.log("pant",id)


useEffect(() => {
  const header = ["Description", "Amount", "Category"];

  function makeCSV(rows) {
    const data = [header, ...rows.map((r) => [r.Description, r.Amount, r.Category])];
  
    return data.map((row) => row.join(",")).join("\n")
  }

  const bob = new Blob([makeCSV([header, ...Expenses])], { type: 'text/csv' });
  downloadLinkRef.current.href = URL.createObjectURL(bob);
}, [Expenses]);


  //
  const getdata = async () => {
    const loading =toast.info("loading....")
    try {
      const res = await fetch(
        `https://expense-tracker-8c9e9-default-rtdb.firebaseio.com/Expenses/${id}.json`,
      );
      const data = await res.json();
      const arraydata = [];
      for (let key in data) {
        arraydata.push({
          Amount: data[key].Amount,
          Description: data[key].Description,
          Category: data[key].Category,
          key: key,
        });
      }
        console.log("called ")
      if(res.ok){
        toast.dismiss(loading)
      dispatch(ExpenseActions.addtoexpense(arraydata))

      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  //
  console.log("this is expenses", Expenses);

  const submithandler = async (e) => {
    e.preventDefault();
    const expense = {
      Description: description,
      Amount: amount,
      Category: category,
    };
    if(description.length <1 || amount<1 ||  category.length<1 ){
         toast.warning("enter the valid details")
         return;
    }
    const postdata = async () => {
      let res;
  const  loading =toast.info("loading....")
      try {
        if (selectedexpens) {
          res = await fetch(
            `https://expense-tracker-8c9e9-default-rtdb.firebaseio.com/Expenses/${id}/${selectedexpens.key}.json`,
            {
              method: "PATCH",
              body: JSON.stringify(expense),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          res = await fetch(
            `https://expense-tracker-8c9e9-default-rtdb.firebaseio.com/Expenses/${id}.json`,
            {
              method: "POST",
              body: JSON.stringify(expense),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }

        const data = res.json();
        if (res.ok) {
           toast.dismiss(loading)
          setselectedexpense(null); // Clear selected expense after successful update/create
          setAmount("");
          setDescription("");
          setCategory("Food");
          getdata();
        } else {
          throw Error(data.error.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    postdata();
  };

  //
  const deleteHandler = async (key) => {
    try {
      const res = await fetch(
        `https://expense-tracker-8c9e9-default-rtdb.firebaseio.com/Expenses/${id}/${key}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("item delete successfully");
        getdata();
      } else {
        throw Error(data.error.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const EditHandler = async (key) => {
    const expense = Expenses.find((item) => item.key === key);
    setAmount(expense.Amount);
    setCategory(expense.Category);
    setDescription(expense.Description);
    setselectedexpense(expense);
  };
  //

  

  return (
    <>
    <div className={classes.exbar}>
      <button  onClick={() => dispatch(ThemeActions.themechange())}>{themeChanger ? "light" : "Dark"}</button>
      <a ref={downloadLinkRef} download="file.csv"> Click here to Download Expenselist</a>
    </div>

      <form className={classes.form} onSubmit={submithandler}>
        <h1 style={{ textAlign: "center" }}>Expenses</h1>

        <Input
          lable={"Amount"}
          input={{
            type0: "number",
            name: "Amount",
            id: "Amount",
            placeholder: "Amount",
            value: amount,
            onChange: (e) => setAmount(e.target.value),
            style:{ backgroundColor: themeChanger ? "white" : "" } // here we passing already inside the object so no need of style={{}}
          }}
        ></Input>
        <Input
          lable={"Description"}
          input={{
            type: "text",
            name: "Description",
            id: "Description",
            placeholder: "Description",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            style:{ backgroundColor: themeChanger ? "white" : "" }
            
          }}
        ></Input>
        <select
          className={classes.select}
          name="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Electronic">Electronic</option>
          <option value="Beauty">Beauty</option>
        </select>

        <div>
          <button className={classes.btn} type="submit" >
            Add Expenses
          </button>
        </div>
      </form>

      <ExpenseList EditHandler={EditHandler} deleteHandler={deleteHandler}></ExpenseList>
      <ToastContainer className="toast-container" />
    </>
  );
};

export default Expenseform;
