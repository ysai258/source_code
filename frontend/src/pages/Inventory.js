import React, {useState} from 'react'
import '../assets/css/custom.css'
import { Button, Modal, Input } from 'antd';

const Inventory = () => {

 const [isModalOpen, setIsModalOpen] = useState(false);
 const [title, setTitle] = useState('');
 const [okText, setOkText] = useState('');
 const [showImageField, setShowImageField] = useState(false);
 const [editFunction, setEditFunction] = useState();

 const showModal = () => {
    setTitle('Add Item');
    setOkText('Add');
    setShowImageField(true);
    setIsModalOpen(true);
 }

 const handleCancel = () => {
    defaultStateVariables();
    setIsModalOpen(false);
 }

 const handleAdd = () => {
    setIsModalOpen(false);
 }

 const handleUpdate = () => {
    setIsModalOpen(false);
 }

 const defaultStateVariables = () => {
    setTitle('');
    setOkText('');
 }

 const showEditModal = () => {
    setTitle('Edit Item');
    setOkText('Update');
    setShowImageField(false);
    setIsModalOpen(true);
 }

  return (
    <div>

        <div style={{width: 'auto', height: '20px'}}></div>

        <div className='stickyHeader'>
            <span className='spanText'>Add Item to Inventory</span>
            <div>
            <Button type="primary" onClick={showModal}>
                Add Item
            </Button>
            <Modal title={title} open={isModalOpen} onOk={editFunction} onCancel={handleCancel} okText={okText}>
                <Input className='modalStyles' placeholder="Name" />
                <Input className='modalStyles' placeholder="Quantity"  type="number"/>
                {showImageField && <Input className='modalStyles' placeholder="Image"  type="file" accept="image/png, image/gif, image/jpeg"/>}
            </Modal>
            </div>
        </div>

        <div style={{width: 'auto', height: '20px'}}></div>

        <div className='flexBox'>
            <div className='itemBox'>
                <img src='/img/hera.jpg' style={{ width: "200px", height: '200px' }}></img>
                <div className='innerFlex'>
                    <p className='nameText'>Name</p>
                    <p className='quantityText'>Quantity</p>
                    <Button type="primary" onClick={showEditModal}>
                        Edit Item
                    </Button>
                </div>
            </div>

            <div style={{width: 'auto', height: '20px'}}></div>
        </div>
    </div>
  )
}
export default Inventory