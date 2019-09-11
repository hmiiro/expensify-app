import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './stores/configureStore';
import { addExpense } from './actions/expenses';
// import { setTextFilter } from './actions/filters';
// import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

// store.dispatch(addExpense({ description:'Electricity for July 2019', amount: 20000 }));
// store.dispatch(addExpense({ description:'Water for Aug 2019', amount: 50000 }));
// store.dispatch(addExpense({ description:'Fuel for Aug 2019', amount: 23000 , createdAt: 1000}));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'))