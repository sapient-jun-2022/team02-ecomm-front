import { Fragment,useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const {productId} = useParams();
    console.log(productId);
    const [formValue,setFormValue] = useState({
        title:'',
        description:'',
        category:'Electronics',
        price:'',
        image:'',
        quantity:''
    });

    useEffect(()=>{
      if(productId){
        fetch(`http://localhost:8000/admin/product/${productId}`,{
          headers:{
            "Content-Type":"application/json"
          },
        })
        .then((res)=>res.json())
        .then((data)=>{
          //navigate("/admin/product");
          setFormValue({
            title:data.title,
            description:data.description,
            category:data.category,
            price: data.price,
            image: data.image,
            quantity: data.quantity
          });
          

        });

      }else{
        setFormValue({
          title:'',
          description:'',
          category:'',
          price: '',
          image: '',
          quantity: ''
        });

      }

    },[productId]);



    const inputChangeHandler = (event,field) => {
        setFormValue((prevState)=>({
          ...prevState,
          [event.target.name]:event.target.value

        }));
        console.log(event.target.value,event.target.name);
    }
    const submitHandler = (event) =>{
        event.preventDefault();
        console.log(productId);
        fetch(`http://localhost:8000/admin/product/${(productId)?productId:''}`,{
          method:(productId)?'PUT':'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(formValue)
        })
        .then((res)=>res.json())
        .then((data)=>{
          navigate("/admin/product");

        });

    }
    const deleteHandler = () =>{
      fetch(`http://localhost:8000/admin/product/${productId}`,{
          method:'DELETE',
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((res)=>res.json())
        .then((data)=>{
          navigate("/admin/product");

        });

    }
  return (
    <Fragment>
      {/* <h3>Add Product</h3> */}
      <div className="row">
        <div className="card">
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="exampleInputTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputTitle"
                  name="title"
                  defaultValue={formValue.title}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleTextDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleTextDescription"
                  name="description"
                  defaultValue={formValue.description}
                  onChange={inputChangeHandler}
                ></textarea>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="exampleInputPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputPrice"
                      name="price"
                      defaultValue={formValue.price}
                      onChange={inputChangeHandler}

                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="exampleInputQuantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="form-control"
                      id="exampleInputQuantity"
                      name="quantity"
                      defaultValue={formValue.quantity}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputImage" className="form-label">
                  Image
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputImage"
                  name="image"
                  defaultValue={formValue.image}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="d-grid gap-2  d-md-flex justify-content-md-start">
              <button type="submit" className="btn btn-primary">
                {productId && 'Edit Product'}
                {!productId && 'Add Product'}
              </button>
              {!!productId &&<button type="button" className="btn btn-danger" onClick={deleteHandler}>
                Delete Product
              </button>}

              </div>

              
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AddProduct;
