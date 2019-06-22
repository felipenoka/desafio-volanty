import React from 'react';
import { Form } from 'react-bootstrap';


const Select = ({ name, placeholder, options, handleChange }) => ( 
    
    <Form.Control 
            as="select"
            size="lg"       
            name={name} 
            defaultValue="placeholder"
            onChange={handleChange}
            className="noanimation mt-3"                   
        >
            <option name="placeholder" value="placeholder">
                {placeholder}
            </option>  
            {options.map((option, index) => (                
                <option key={index} name={option.name} value={ option['name'] === 'Carro' ? 'carro' : option.id || option['name'].toLowerCase()}>
                    {option.name}
                </option>                
            ))}             
    </Form.Control>
    
)



export default Select;