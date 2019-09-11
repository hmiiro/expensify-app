import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
    state = {
        dateFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (dateFocused) => {
        this.setState(() => ({ dateFocused }));
    };
    render() {
        return (
            <div>
                <label>Search Expenses:</label>
                <input 
                    type="text"
                    value={this.props.filters.text} 
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value));
                    }}
                />
                <label>Sort Expenses:</label>
                <select 
                    value={this.props.filters.sortBy} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "date") {
                            this.props.dispatch(sortByDate())
                        } else if (value === "amount") {
                            this.props.dispatch(sortByAmount());
                        } 
                    }}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>

                <DateRangePicker 
                startDate={this.props.filters.startDate}
                startDateId="startDateId"
                endDate={this.props.filters.endDate}
                endDateId="endDateId"
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.dateFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                showClearDates={true}
                displayFormat={() => "DD/MM/YYYY"}
                />
            </div>
                );
    };
}


const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);