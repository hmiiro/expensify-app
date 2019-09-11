import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
        { 
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = {}
     ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }});
// REMOVE_EXPENSE
const removeExpense = ( { id } = {}) => ( {
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({ 
    type: 'SET_TEXT_FILTER',
    text
 });

 // SORT_BY_AMOUNT
const sortByAmount = (sortBy = 'amount') => {
    return ({
        type: 'SORT_BY_AMOUNT',
        sortBy
    });
};

// SORT_BY_DATE
const sortByDate = (sortBy = 'date') => {
    return ({
        type: 'SORT_BY_DATE',
        sortBy
    });
};
// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
  });
  
  // SET_END_DATE
  const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
  });
  

// EXPENSE REDUCER

    // defaut state for expenses reducer
    const expenseReducerDefautState = [];
    //create expense reducer
    const expenseReducer = (state = expenseReducerDefautState, action) => {
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

// FILTERS REDUCER
    // defaut state for filters reducer
    const filtersReducerDefautState = {
            text: '',
            sortBy: 'date',
            startDate: undefined,
            endDate: undefined
        };
    //create filter reducer
    const filtersReducer = (state = filtersReducerDefautState, action) => {
        switch (action.type) {
            case 'SET_TEXT_FILTER':
                return {
                    ...state,
                    text: action.text
                }
            case 'SORT_BY_AMOUNT':
                return {
                    ...state,
                    sortBy: action.sortBy
                }
            case 'SORT_BY_DATE':
                return {
                    ...state,
                    sortBy: action.sortBy
                }
            case 'SET_START_DATE':
                return {
                    ...state,
                    startDate: action.startDate
                };
            case 'SET_END_DATE':
                return {
                    ...state,
                    endDate: action.endDate
                };
            default:
                return state;
            
        }
    };


// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
      const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
  
      return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
  };

// STORE CREATION
const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filtersReducer
    })
    );
// Track state changes
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

// run the state chages
const expenseOne = store.dispatch(
    addExpense(
        {
            description: 'Rent for Aug 2019',
            amount: 500000
        }
    ));

    const expenseTwo = store.dispatch(
    addExpense(
        {
            description: 'Transport for Aug 2019',
            amount: 250000
        }
    ));

   store.dispatch(removeExpense({ id: expenseOne.expense.id }));

   store.dispatch(editExpense(expenseTwo.expense.id, { amount: 400000 }));

   store.dispatch(setTextFilter('rent'));
   store.dispatch(setTextFilter(''));

   store.dispatch(sortByAmount());
   store.dispatch(sortByDate());