
// EXPENSE REDUCER

    // defaut state for expenses reducer
     const expensesReducerDefautState = [];
    //create expense reducer
export default (state = expensesReducerDefautState, action) => {
        switch (action.type) {
            case 'ADD_EXPENSE':
               //return state.concat(action.expense);
               return [
                   ...state, 
                action.expense
            ];
            case 'REMOVE_EXPENSE':
                return state.filter(({ id }) => id !== action.id);
            case 'EDIT_EXPENSE':
                return state.map((expense) => {
                    if (expense.id === action.id) {
                        return {
                            ...expense, // spread existing expense
                            ...action.updates // pass on the updates to create a new object
                        }
                    } else {
                        return expense;
                    }
                })

            default:
                return state;
            
        }
    };
