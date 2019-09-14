import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import ExpenseListFilters from './ExpenseListFilters';
import ExpenseSummary from './ExpensesSummary';

const ExpenseList = (props) => (
    <div>
        <h2>Expenses</h2>
        <ExpenseSummary />
        <ExpenseListFilters />
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
                ) : (
                    props.expenses.map((expense) => {
                        return <ExpenseListItem key={expense.id} {...expense} />;
                })
                )
        }
         
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);
