import React, {useState, useEffect} from 'react'
import '../assets/css/custom.css'
import { Button, Modal, Input, Alert } from 'antd';

const Inventory = () => {

 const [isModalOpen, setIsModalOpen] = useState(false);
 const [title, setTitle] = useState('');
 const [okText, setOkText] = useState('');
 const [isEditFunction, setIsEditFunction] = useState();
 const [addName, setAddName] = useState('');
 const [addQuantity, setAddQuantity] = useState('');
 const [editName, setEditName] = useState('');
 const [editQuantity, setEditQuantity] = useState('');
 const [rows, setRows] = useState([]);
 const [warning, setWarning] = useState('');
 const showModal = () => {
    setTitle('Add Item');
    setOkText('Add');
    setIsEditFunction(false);
    setIsModalOpen(true);
 }

 const handleCancel = () => {
    setTitle('');
    setOkText('');
    setIsModalOpen(false);
    setWarning('');
 }

 const handleAdd = () => {
    if (addName.trim().length && Number.isInteger(addQuantity)) {
        setWarning('');
        setIsModalOpen(false);
    } else {
        setWarning('All Fields Are Mandatory');
    }
 }

 const handleUpdate = () => {
    if (editName.trim().length  && Number.isInteger(editQuantity)) {
        setWarning('');
        setIsModalOpen(false);
    } else {
        setWarning('Name & Quantity are mandatory fields');
    }
 }

 const showEditModal = (data) => {
    setEditName(data.name);
    setEditQuantity(data.quantity);
    setTitle('Edit Item');
    setOkText('Update');
    setIsEditFunction(true);
    setIsModalOpen(true);
 }

 useEffect(() => {
    setRows([
        {id :1, name : 'a', quantity : 100},
        {id :2, name : 'b', quantity : 200},
        {id :3, name : 'c', quantity : 300},
        {id :4, name : 'd', quantity : 400},
        {id :5, name : 'e', quantity : 500},
        {id :6, name : 'f', quantity : 600},
        {id :7, name : 'g', quantity : 700},
        {id :8, name : 'h', quantity : 800}
    ]);
 }, [])
 

  return (
    <div>

        <div style={{width: 'auto', height: '20px'}}></div>

        <div className='stickyHeader'>
            <span className='spanText'>Add Item to Inventory</span>
            <div>
            <Button type="primary" onClick={showModal}>
                Add Item
            </Button>
            {!isEditFunction && <Modal title={title} open={isModalOpen} onOk={handleAdd} onCancel={handleCancel} okText={okText}>
                {warning && <Alert message={warning} type="warning" showIcon />}
                <Input className='modalStyles' placeholder="Name" onChange={(e) => setAddName(e.target.value)}/>
                <Input className='modalStyles' min='0' placeholder="Quantity"  type="number" onChange={(e) => setAddQuantity(parseInt(e.target.value))}/>
                <Input className='modalStyles' placeholder="Image"  type="file" accept="image/png, image/gif, image/jpeg"/>
            </Modal>}
            {isEditFunction && <Modal title={title} open={isModalOpen} onOk={handleUpdate} onCancel={handleCancel} okText={okText}>
                {warning && <Alert message={warning} type="warning" showIcon />}
                <Input className='modalStyles' placeholder="Name"  onChange={(e) => setEditName(e.target.value)} value={editName}/>
                <Input className='modalStyles' min='0' placeholder="Quantity" type="number" onChange={(e) => setEditQuantity(parseInt(e.target.value))} value={editQuantity}/>
            </Modal>}
            </div>
        </div>

        <div style={{width: 'auto', height: '20px'}}></div>

        <div className='flexBox'>
            {rows.length>0 && rows.map(row => 
            <>
                <div className='itemBox'>
                    <img src='/img/hera.jpg' alt="img" style={{ width: "200px", height: '200px' }}></img>
                    <div className='innerFlex'>
                        <p className='nameText'>{row.name}</p>
                        <p className='quantityText'>{row.quantity}</p>
                        <Button type="primary" onClick={() => showEditModal(row)}>
                            Edit Item
                        </Button>
                    </div>
                </div>

                <div style={{width: 'auto', height: '20px'}}></div>
            </>)}  
        </div>
    </div>
  )
}
export default Inventory