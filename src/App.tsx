import { useState } from "react";
import Form from "./components/Form";
import ExpenceList from "./components/ExpenceList";
import ExpenseFilter from "./components/ExpenseFilter";



function App() {
  const [selectCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "Milk", amount: 20, category: "Groceries" },
    { id: 2, description: "Movie", amount: 70, category: "Entertainment" },

  ]);

  const visibleExpenses = selectCategory
    ? expenses.filter((e) => e.category === selectCategory)
    : expenses;

  return (
    <>
      <div>
        <Form onSubmit={expense => setExpenses([...expenses,{...expense, id:expenses.length === null? 1 : expenses.length+1}])} />
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
        <ExpenceList
          expences={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        />
      </div>
    </>
  );
}

export default App;
