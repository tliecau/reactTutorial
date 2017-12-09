class Product extends React.Component {
 constructor(props, context) {
    super(props, context);
    
    this.state = {
      qty: 0
    };
    
    this.buy=this.buy.bind(this);
    this.show=this.show.bind(this);
  }
  
  buy() {
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  };
  
  show() {
    this.props.handleShow(this.props.name);
  };
  
  render() {
    return (
      <div>
        <p>{this.props.name} - {this.props.price}</p>
        <button onClick={this.buy}>Buy</button>
        <button onClick={this.show}>Show</button>
        <h3>Qty:  {this.state.qty} item(s) </h3>
        <hr/>
      </div>
    )
  };
}

class Total extends React.Component {
    render() {
      return (
        <div>
          <h3>Total chash: {this.props.total} $</h3>
        </div>
      )
   };
 }

class ProductForm extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.submit=this.submit.bind(this);
  }
  
  submit(e) {
      e.preventDefault();
      var product = {
        name: this.refs.name.value,
        price: parseInt(this.refs.price.value)
      }
      
      this.props.handleCreate(product);
      this.refs.name.value = "";
      this.refs.price.value = "";
  };
  
  render() {
    return (
      <form  onSubmit={this.submit}> 
        <input type="text" placeholder="Product Name" ref="name"/>
        <input type="text" placeholder="Product Price" ref="price"/>
        <br/>
        <button>Create Product</button>
      </form>
    )
  };
};

class ProductList extends React.Component {
   constructor(props, context) {
    super(props, context);

    this.state = {
      total: 0,
      productList: [
        {name: "Android", price: 123},
        {name: "Aple", price: 321},
        {name: "Windows", price: 9}
        ]
    };
    
    this.recalculateTotal=this.recalculateTotal.bind(this);
    this.createProduct=this.createProduct.bind(this);
  };
  
  createProduct(product) {
    this.setState({productList : this.state.productList.concat(product)});
  };
  
  recalculateTotal(newPrice) {
    this.setState({total: this.state.total + newPrice});
  };
  
  showProduct(name) {
    alert("you selected " + name )
  };
  
  render() {
    var component = this;
    var products = this.state.productList.map(product => {
      return (
           <Product name={product.name} price={product.price}
              handleShow = {component.showProduct} 
              handleTotal = {component.recalculateTotal}/>
        )
    })
      return (
        <div>
          <ProductForm handleCreate = {this.createProduct} />
          {products}
          <Total total={this.state.total}/>
        </div>
        )
    };
}

ReactDOM.render(
        <ProductList/>,
        document.getElementById('root')
);
