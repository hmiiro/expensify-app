import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt, note }) => (
    
    <div>
        <h5>{moment(createdAt).format("DD/MM/YYYY")}</h5>
        {note ? <h5><Link to={`/edit/${id}`}>{description}</Link> - {note}</h5> : <h5><Link to={`/edit/${id}`}>{description}</Link></h5>}
        
        <h5>{numeral(amount).format('0,0.00')}</h5>
        
    </div>
);


export default ExpenseListItem;