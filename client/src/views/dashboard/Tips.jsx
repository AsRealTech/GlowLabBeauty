// react-bootstrap
import { Row, Col, Card, Table, Form, Modal, Button } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../contexts/ConfigContext';
import { useAuth } from "../../hooks/useAuth";

import FeedTable from 'components/Widgets/FeedTable';
import feedData from 'data/feedData';
import { toast } from 'react-toastify';

// -----------------------|| DASHBOARD SALES ||-----------------------//
export default function Tips() {
  const [tips, setTips] = useState([]);
  const { state } = useContext(ConfigContext);
  const {fetchTips, newTips, delTips, update_Tips} =  useAuth();
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalTitle, setModalTitle] = useState('');
  const [tipsId, setTipsId] = useState('');
  const [tipsTitle, setTipsTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    const getTips = async () => {
      try {
        const resTips = await fetchTips();
        setTips(resTips);
      } catch (error) {
        console.error('Failed to fetch Tipss:', error);
      }
    };

    getTips();
  }, []);

  const HandleEdit =  (id,Name,Icon,description) => {
    setModalTitle("Edit Tips");
    handleShow();
    setTipsId(id);

    setTipsTitle(Name);
    setIcon(Icon);
    setDescription(description);
    
  }
  
  const HandleAdd =  async () => {
    setModalTitle("Add new Tips");
    
    handleShow();

    setTipsTitle('');
    setIcon('');
    setDescription('');
  }

  const submitEdit =  async (e) => {
    e.preventDefault();
    const id = e.target.tipsId.value;
    const name = e.target.TipsName.value;
    const Icon = e.target.TipsIcon.value;
    const description = e.target.Tipsdescription.value;

    if (!id || !name || !Icon || !description ) {
      toast.warning("Please fill in all fields");
      return;
    }

     const success =  await update_Tips(id, name, Icon, description, review, imageUrl);

     if(success){
      toast.success("Tips added successfully");
     }else{
      toast.warning("Failed to add Tips");
     }
  }
  const addTips =  async (e) => {
    e.preventDefault();
    if(!confirm("Are you sure you want add this new Tips?")) return ;
    const name = e.target.TipsName.value;
    const Icon = e.target.TipsIcon.value;
    const description = e.target.Tipsdescription.value;

    if (!name || !Icon || !description) {
      toast.warning("Please fill in all fields");
      return;
    }

     const success =  await newTips({ icon: Icon, title: name, description: description});

     if(success){
      toast.success("Tips added successfully");
      handleClose();
     }else{
      toast.warning("Failed to add Tips");
      handleClose();
     }
  }

  const HandleDelTips =  async (id) => {
    if(!confirm("Are you sure you want delete this Tips?")) return ;
     const success = await delTips(Number(id));

      if(success){
        toast.success(success?.message);
      }else{
        toast.warning(success?.message);
      }
  }


  return (
    <Row>
      <Col md={12} xl={12}>
        {/* Tips Table */}
        <Card className="mb-3">
          <Card.Header>
            <Card.Title as="h5" className='d-flex justify-content-between'>
              Tips       
              <Button variant="primary" className='btn-sm' onClick={HandleAdd}>
              + Tips
            </Button>
        </Card.Title>
          </Card.Header>
          <Card.Body>
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>icon</th>
                    <th>Desc</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tips && tips.map((p) => (
                    <tr key={p.id}>
                      <td>{p.title}</td>
                      <td>{p.icon}</td>
                      <td>{p.description.slice(0,20)}...</td>
                      <td>
                        <i onClick={()=>HandleEdit(p.id,p.title,p.icon,p.description)} className="feather icon-edit f-16 text-success ms-3"></i>
                        <i onClick={() => HandleDelTips(p.id)} className="feather icon-trash-2 f-16 text-danger ms-3 px-3"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>  
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} xl={6} className='d-none'>
        {/* Feed Table */}
        <FeedTable {...feedData} />
      </Col>

      {/* modal box */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title  id='modal-title'>{modalTitle ? modalTitle : "Add new Tips"}</Modal.Title>
        </Modal.Header>
          <Form onSubmit={addTips}>
              <Form.Control type="hidden" value={tipsId}/>
           <Modal.Body>
            <Form.Group className="mb-3" controlId="TipsName">
              <Form.Label>Tips Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Tips name" value={tipsTitle} onChange={(e) => setTipsTitle(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="TipsIcon">
              <Form.Label>Icon</Form.Label>
              <Form.Control type="text" placeholder="Enter Icon"  value={icon} onChange={(e) => setIcon(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Tipsdescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description " value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type='submit'>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
      </Modal>
    </Row>
  );
}
