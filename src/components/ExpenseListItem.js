import React from 'react';

import moment from 'moment';
import { Link } from 'react-router-dom'

const ExpenseListItem = ({ id, description, amount, createdAt, note }) => (
    
    <div>
        <h5>{moment(createdAt).format("DD/MM/YYYY")}</h5>
        {note ? <h5>{description} - {note}</h5> : <h5>{description}</h5>}
        
        <h5><Link to={`/edit/${id}`}>{amount}</Link></h5>
        
    </div>
);


export default ExpenseListItem;