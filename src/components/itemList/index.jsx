import Item from '../item';

const ItemDetail = ({products}) => {
    return (
        <>
        <div className="row">
            <div className="col-lg-12">

            {products.map((product)=>{
                return (
                    <Item  
                        key={product.id} 
                        name={product.name} 
                        features={product.feature} 
                        price={product.price} 
                        description={product.description} 
                        image={product.pictureUrl} 
                    />
                )
            })}

            </div> 
        </div> 

        </>
    )
}

export default ItemDetail