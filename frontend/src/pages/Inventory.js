import React, {useState, useEffect} from 'react'
import '../assets/css/custom.css'
import { Button, Modal, Input, Alert, Spin, message } from 'antd';
import { INVENTORY_API } from '../constants/constants';

const Inventory = () => {

 const [isModalOpen, setIsModalOpen] = useState(false);
 const [title, setTitle] = useState('');
 const [okText, setOkText] = useState('');
 const [isEditFunction, setIsEditFunction] = useState();
 const [addName, setAddName] = useState('');
 const [addQuantity, setAddQuantity] = useState('');
 const [addImgUrl, setAddImgUrl] = useState('dummyUrl');
 const [editId, setEditId] = useState(''); 
 const [editName, setEditName] = useState('');
 const [editQuantity, setEditQuantity] = useState('');
 const [rows, setRows] = useState([]);
 const [warning, setWarning] = useState('');
 const [totalDataCount,setTotalDataCount] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [messageApi, contextHolder] = message.useMessage();

const success = () => {
    messageApi.open({
        type: 'success',
        content: 'Success',
    });
}

const error = () => {
    messageApi.open({
        type: 'error',
        content: 'Something went wrong!!!',
    });
}

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


 const handleAdd = async () => {
    if (addName.trim().length && Number.isInteger(addQuantity)) {
        const res = await fetch(`${INVENTORY_API}/addItem`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name":addName,"quantity":addQuantity,"img_s3path":addImgUrl}),
          });
        if(res.ok){
            setAddName('');
            setAddQuantity('');
            setAddImgUrl('');
            setWarning('');
            setIsModalOpen(false);
            fetchItems();
            success();
        } else {
            error();
        }
    } else {
        setWarning('All Fields Are Mandatory');
    }
 }

 const handleUpdate = async() => {
    if (editName.trim().length  && Number.isInteger(editQuantity)) {
        const res = await fetch(`${INVENTORY_API}/updateItem`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "_id":editId,"name":editName,"quantity":editQuantity}),
          });
          if(res.ok){
            setWarning('');
            setIsModalOpen(false);
            fetchItems();
            success();
        } else {
            error();
        }

    } else {
        setWarning('Name & Quantity are mandatory fields');
    }
 }

 const showEditModal = (data) => {
    setEditId(data._id);
    setEditName(data.name);
    setEditQuantity(data.quantity);
    setTitle('Edit Item');
    setOkText('Update');
    setIsEditFunction(true);
    setIsModalOpen(true);
 }

 const fetchItems = async () => {
    try {
    setIsLoading(true);
      const res = await fetch(
        `${INVENTORY_API}/getItems`
      );
      const data = await res.json();
      setRows(data.items);
      setTotalDataCount(data.totalCount);
      setIsLoading(false);
    } catch (error) {
      console.log("error while fetching users", error);
    }
  };

 useEffect(() => {
   fetchItems();
 }, []);
 

  return (
    <div>
        {contextHolder}
        <div style={{width: 'auto', height: '20px'}}></div>

        <div className='stickyHeader'>
            <span className='spanText'>Add Item to Inventory</span>
            <div>
            <Button type="primary" onClick={showModal}>
                Add Item
            </Button>
            {!isEditFunction && <Modal title={title} open={isModalOpen} onOk={handleAdd} onCancel={handleCancel} okText={okText}>
                {warning && <Alert message={warning} type="warning" showIcon />}
                <Input className='modalStyles' placeholder="Name" value={addName} onChange={(e) => setAddName(e.target.value)}/>
                <Input className='modalStyles' min='0' placeholder="Quantity"  type="number" value={addQuantity} onChange={(e) => setAddQuantity(parseInt(e.target.value))}/>
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
        {!isLoading && rows.length>0 && <span className='totalCount'>Total Items In Inventory : {totalDataCount}</span> }
        <div style={{width: 'auto', height: '20px'}}></div>
        <div className='flexBox'>
            {isLoading  && <Spin size="large"/>}
            {(!isLoading && rows.length === 0) && <Alert style={{width:'50%', margin:'auto'}} message='Inventory is empty, Please add items' type="info" showIcon />}
            {rows.length>0 && rows.map(row => 
            <div key={row._id}>
                <div className='itemBox'>
                    <img src={row.img_s3path} alt={row.name} style={{ width: "200px", height: '200px' }}></img>
                    <div className='innerFlex'>
                        <p className='nameText'>{row.name}</p>
                        <p className='quantityText'>{row.quantity}</p>
                        <Button type="primary" onClick={() => showEditModal(row)}>
                            Edit Item
                        </Button>
                    </div>
                </div>

                <div style={{width: 'auto', height: '20px'}}></div>
            </div>)}
        </div>
    </div>
  )
}
export default Inventory