// react-bootstrap
import { Row, Col, Card, Table, Form, Modal, Button } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../contexts/ConfigContext';
import { useAuth } from "../../hooks/useAuth";

import FeedTable from 'components/Widgets/FeedTable';
import feedData from 'data/feedData';
import { toast } from 'react-toastify';

// -----------------------|| DASHBOARD SALES ||-----------------------//
export default function Ingredients() {
  const [igredients, setIgredients] = useState([]);
  const { state } = useContext(ConfigContext);
  const {fetchIgredients, newIgredients, delIgredients, update_Igredients} =  useAuth();
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalTitle, setModalTitle] = useState('');
  const [IgredientsId, setIgredientsId] = useState('');
  const [IgredientsName, setIgredientsName] = useState('');
  const [Category, setCategory] = useState('');
  const [Benefits, setBenefits] = useState('');
  const [description, setdescription] = useState('');
  
  useEffect(() => {
    const getIgredients = async () => {
      try {
        const resIgredients = await fetchIgredients();
        setIgredients(resIgredients);
      } catch (error) {
        console.error('Failed to fetch Igredients:', error);
      }
    };

    getIgredients();
  }, []);

  const HandleEdit =  (id,Name,Category,Benefits,description) => {
    setModalTitle("Edit Igredients");
    handleShow();
    setIgredientsId(id);

    setIgredientsName(Name);
    setCategory(Category);
    setBenefits(Benefits);
    setdescription(description);
    
  }
  
  const HandleAdd =  async () => {
    setModalTitle("Add new Igredients");
    
    handleShow();

    setIgredientsName('');
    setCategory('');
    setBenefits('');
    setdescription('');
  }

  const submitEdit =  async (e) => {
    e.preventDefault();
    const id = e.target.IgredientsId.value;
    const name = e.target.IgredientsName.value;
    const Category = e.target.IgredientsCategory.value;
    const Benefits = e.target.IgredientsBenefits.value;
    const description = e.target.Igredientsdescription.value;

    if (!id || !name || !Category || !Benefits || !description) {
      toast.warning("Please fill in all fields");
      return;
    }

     const success =  await update_Igredients(id, name, Category, Benefits, description);

     if(success){
      toast.success("Igredients added successfully");
     }else{
      toast.warning("Failed to add Igredients");
     }
  }

  const submitAdd =  async (e) => {
    e.preventDefault();
    if(!confirm("Are you sure you want add this new Igredients?")) return ;
    const name = e.target.IgredientsName.value;
    const category = e.target.IgredientsCategory.value;
    const description = e.target.Igredientsdescription.value;
    const benefitss = e.target.IgredientsBenefits.value;

    if (!name || !Category || !benefitss || !description ) {
      toast.warning("Please fill in all fields");
      return;
    }

     const success =  await newIgredients({ name, category, description, benefitss});

     if(success){
      toast.success("Igredients added successfully");
      handleClose();
     }else{
      toast.warning("Failed to add Igredients");
      handleClose();
     }
  }

  const HandleDelIgredients =  async (id) => {
    if(!confirm("Are you sure you want delete this Igredients?")) return ;
     const success = await delIgredients(Number(id));

      if(success){
        toast.success(success?.message);
      }else{
        toast.warning(success?.message);
      }
  }


  return (
    <Row>
      <Col md={12} xl={12}>
        {/* Igredients Table */}
        <Card className="mb-3">
          <Card.Header>
            <Card.Title as="h5" className='d-flex justify-content-between'>
              Igredients       
              <Button variant="primary" className='btn-sm' onClick={HandleAdd}>
              + Igredients
            </Button>
        </Card.Title>
          </Card.Header>
          <Card.Body>
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Igredients Name</th>
                    <th>Category</th>
                    <th>Benefits</th>
                    <th>Desc</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {igredients && igredients.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.benefits.slice(0,20)}...</td>
                      <td>{p.description.slice(0,20)}...</td>
                      <td>
                        {/* <i onClick={()=>HandleEdit(p.id,p.name,p.category,p.benefits,p.description)} className="feather icon-edit f-16 text-success ms-3"></i> */}
                        <i onClick={() => HandleDelIgredients(p.id)} className="feather icon-trash-2 f-16 text-danger ms-3 px-3"></i>
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
          <Modal.Title  id='modal-title'>{modalTitle ? modalTitle : "Add new Igredients"}</Modal.Title>
        </Modal.Header>
          <Form onSubmit={submitAdd}>
              <Form.Control type="hidden" value={IgredientsId}/>
           <Modal.Body>
            <Form.Group className="mb-3" controlId="IgredientsName">
              <Form.Label>Igredients Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Igredients name" value={IgredientsName} onChange={(e) => setIgredientsName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="IgredientsCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter Category"  value={Category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="IgredientsBenefits">
              <Form.Label>Benefits</Form.Label>
              <em className='px-4 text-info'><small>sperate the benefits with coma ( , )</small></em>
              <Form.Control type="text" placeholder="Enter Benefits " value={Benefits} onChange={(e) => setBenefits(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Igredientsdescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setdescription(e.target.value)} />
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
