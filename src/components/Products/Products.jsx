
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";

import { useCart } from '../../context/cartContext';
import { useProducts } from '../../context/productsContext';
import { useToast } from '../../context/toastContext';

import handleError from '../../helpers/errorHandle';
import api from '../../utils/api';
import styles from './Products.module.css';
import {SearchOutlined } from "@ant-design/icons"

export function Products() {
  
const table = JSON.parse(localStorage.getItem("@taNaMesa:user")).name;

const { products, setProducts } = useProducts();
const { cart, setCart } = useCart();
const { addToast } = useToast();

const [filteredProducts, setFilteredProducts] = useState([]);

const [currentFilter, setCurrentFilter] = useState('No Filter');

const [filterButton, setFilterButton] = useState("");
const [filterSearch, setFilterSearch] = useState("");




const filtersUsed = []

function filterProducts(){
  let filterProduct = products.filter((product)=>{   
    return (product.type.includes(filterButton)) && product.name.toLowerCase().includes(filterSearch.toLowerCase())
  })
  setFilteredProducts(filterProduct)
} 
useEffect(() => {filterProducts()}, [filterSearch, filterButton]);

function handleFilterClick(product, filter) {
  if (product != null) { 
    setFilterButton(product.type)  }
  else {
    setFilterButton("")
  }
  setCurrentFilter(filter)
}

useEffect(() => {
  async function loadProducts() {
      try {   
        const response = await api.get("/products");
        setProducts(response.data);
        setFilteredProducts(response.data)

      } catch (err){
          const message = handleError(err);
          addToast({ type: "error", title: 'Carregar dados', message })
      }
    }
    if (products.length === 0) loadProducts();
   
  }, [ setProducts, addToast, products]);




  return (
    <div className={cart.length > 0? `${styles.containerProducts} ${styles.cartOn}` : `${styles.containerProducts}`}>
      <div className={styles.header}>
        <div className={styles.topHeader}>
          <div className={styles.names}>
          <h1>Tá na Mesa Restaurante</h1>
          <p>{table}</p>
          </div>
          <div className={styles.searchBar}>
          <label htmlFor="SearchBar"><SearchOutlined style={{position: "absolute", top:"1.5vh", left:"1.5vh", fontSize:"1rem"}}/></label>          
          <input id="SearchBar" className={styles.searchBarInput} onChange={(e) => setFilterSearch(e.target.value)} type="text" placeholder="Digite a pesquisa"/>
          </div>
          </div>
        <div className={styles.filters}>
  

    <span className={currentFilter === 'No Filter' ? `${styles.filterButton} ${styles.selected}` : `${styles.filterButton}`} onClick={()=> handleFilterClick(null, "No Filter")} >Sem Filtro</span>
    {products.map((product) => (      
      filtersUsed.includes(product.type) ? "":filtersUsed.push(product.type)?    
      <span key={product.id} className={currentFilter === product.type ? `${styles.filterButton} ${styles.selected}` : `${styles.filterButton}` } onClick={()=> handleFilterClick(product, product.type)}>{product.type}</span>
      :""
    
    ))} 
        
        </div>
        <div className={styles.title}>
          <h2>Escolha sua Janta</h2>
        </div>
      </div>
      <div className={styles.products}>
      {filteredProducts.map(product => {
      return(   
        <ProductCard key={product.id} product={product} />
        
      )})}

      </div>
    </div>  

  );
}