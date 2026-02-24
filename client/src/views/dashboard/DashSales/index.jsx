// react-bootstrap
import { Row, Col, Card, Table, Form, Modal, Button } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../../contexts/ConfigContext';
import { useAuth } from "../../../hooks/useAuth";

// third party
// import Chart from 'react-apexcharts';

// project imports
// import FlatCard from 'components/Widgets/Statistic/FlatCard';
import ProductCard from 'components/Widgets/Statistic/ProductCard';
import FeedTable from 'components/Widgets/FeedTable';
import ProductTable from 'components/Widgets/ProductTable';
// import { SalesCustomerSatisfactionChartData } from './chart/sales-customer-satisfication-chart';
// import { SalesAccountChartData } from './chart/sales-account-chart';
// import { SalesSupportChartData } from './chart/sales-support-chart';
// import { SalesSupportChartData1 } from './chart/sales-support-chart1';
import feedData from 'data/feedData';
import productData from 'data/productTableData';
import { toast } from 'react-toastify';

// -----------------------|| DASHBOARD SALES ||-----------------------//
export default function DashSales() {
  const [prod, setProd] = useState([]);
  const [ig, setIg] = useState([]);
  const [tips, setTips] = useState([]);
  const { state } = useContext(ConfigContext);
  const {fetchProduct, fetchIgredients, fetchTips, newProduct, delProduct, update_Product} =  useAuth();
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalTitle, setModalTitle] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [rate, setRate] = useState('');
  const [highlight, setHighlight] = useState('');
  const [review, setReview] = useState('');
  const [imageURL, setImageURL] = useState('');
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const resProd = await fetchProduct();
        setProd(resProd.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    const getIgredients = async () => {
      try {
        const res = await fetchIgredients();
        setIg(res);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
    
    const getTips = async () => {
      try {
        const res = await fetchTips();
        setTips(res);
      } catch (error) {
        console.error('Error fetching tips:', error);
      }
    }

    getIgredients();
    getTips();
    getProducts();
  }, []);

  const HandleEdit =  (id,Name,rate,highlight,review,imageURL) => {
    setModalTitle("Edit Product");
    handleShow();
    setProductId(id);

    setProductName(Name);
    setRate(rate);
    setHighlight(highlight);
    setReview(review);
    setImageURL(imageURL);
    
  }
  
  const HandleAdd =  async () => {
    setModalTitle("Add new product");
    
    handleShow();

    setProductName('');
    setRate('');
    setHighlight('');
    setReview('');
    setImageURL('');
  }

  const submitEdit =  async (e) => {
    e.preventDefault();
    const id = e.target.productId.value;
    const name = e.target.productName.value;
    const rate = e.target.productRate.value;
    const highlight = e.target.productHighlight.value;
    const review = e.target.productReview.value;
    const imageUrl = e.target.productImageURL.value;

    if (!id || !name || !rate || !highlight || !review || !imageUrl) {
      toast.warning("Please fill in all fields");
      return;
    }

     const success =  await update_Product(id, name, rate, highlight, review, imageUrl);

     if(success){
      toast.success("Product added successfully");
     }else{
      toast.warning("Failed to add product");
     }
  }
  const submitAdd =  async (e) => {
    e.preventDefault();
    if(!confirm("Are you sure you want add this new Product?")) return ;
    const name = e.target.productName.value;
    const rate = e.target.productRate.value;
    const highlight = e.target.productHighlight.value;
    const review = e.target.productReview.value;
    const imageUrl = e.target.productImageURL.value;

    if (!name || !rate || !highlight || !review || !imageUrl) {
      toast.warning("Please fill in all fields");
      return;
    }

     const success =  await newProduct( name, rate, highlight, review, imageUrl);

     if(success){
      toast.success("Product added successfully");
     }else{
      toast.warning("Failed to add product");
     }
  }

  const delProd =  async (id) => {
    if(!confirm("Are you sure you want delete this Product?")) return ;
     const success = await delProduct(Number(id));

      if(success){
        toast.success(success?.message);
      }else{
        toast.warning(success?.message);
      }
  }


  return (
    <Row>
      <Col md={12} xl={12}>
        <Row>
          <Col sm={3}>
            <ProductCard params={{ title: 'Total Products', primaryText: `${prod.length}`, icon: 'card_giftcard' }} />
          </Col>
          <Col sm={3}>
            <ProductCard params={{ variant: 'primary', title: 'Total Ingredients', primaryText: `${ig.length}`, icon: 'local_mall' }} />
          </Col>
          <Col sm={3}>
            <ProductCard params={{ variant: 'primary', title: 'Total Tips', primaryText: `${tips.length}`, icon: 'monetization_on' }} />
          </Col>
          <Col sm={3}>
            <ProductCard params={{ title: 'Product Sold', primaryText: '6,784', icon: 'local_offer' }} />
          </Col>
        </Row>
        {/* Product Table */}
        {/* <ProductTable {...productData} /> */}
        <Card className="mb-3">
          <Card.Header>
            <Card.Title as="h5" className='d-flex justify-content-between'>
              Products       
              <Button variant="primary" className='btn-sm' onClick={HandleAdd}>
              + Product
            </Button>
        </Card.Title>
          </Card.Header>
          <Card.Body>
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Rate</th>
                    <th>Review</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {prod && prod.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td><img src={p.imageUrl} alt="" style={{width:"40px", height:"40px"}} /></td>
                      <td>{p.rate}</td>
                      <td>{p.review.slice(0,20)}...</td>
                      <td>
                        {/* <i onClick={()=>HandleEdit(p.id,p.name,p.rate,p.highlight,p.review,p.imageUrl)} className="feather icon-edit f-16 text-success ms-3"></i> */}
                        <i onClick={() => delProd(p.id)} className="feather icon-trash-2 f-16 text-danger ms-3 px-3"></i>
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
          <Modal.Title  id='modal-title'>{modalTitle ? modalTitle : "Add new product"}</Modal.Title>
        </Modal.Header>
          <Form onSubmit={submitAdd}>
              <Form.Control type="hidden" value={productId}/>
           <Modal.Body>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productRate">
              <Form.Label>Rate</Form.Label>
              <Form.Control type="text" placeholder="Enter Rate"  value={rate} onChange={(e) => setRate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productHighlight">
              <Form.Label>Highlight</Form.Label>
              <Form.Control type="text" placeholder="Enter Highlight " value={highlight} onChange={(e) => setHighlight(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productReview">
              <Form.Label>Review</Form.Label>
              <Form.Control type="text" placeholder="Enter Review" value={review} onChange={(e) => setReview(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productImageURL">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
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
