import React from 'react'
import { FormControl, InputLabel, Input} from '@mui/material';
import '../assets/css/custom.css'

const Inventory = () => {

const onImageChange = () => {

}

  return (
    <div>
        <h1>Add Items</h1>
        <div className='flexBox'>
            <FormControl className='formField'>
                <InputLabel htmlFor="my-input">Item Name</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl className='formField'>
                <InputLabel htmlFor="my-input">Quantity</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <div>
                <input type="file" onChange={onImageChange} className="filetype" />
            </div>
        </div>
    </div>
  )
}
export default Inventory