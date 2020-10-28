import React from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';


export default class SelectCategory extends React.Component {

    render() {
        return (
            <div>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                        value={this.props.option}
                        label="category"
                        onChange={this.props.onChange}>
                        {this.props.categoryOptions.map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </div >
        );
    }
}