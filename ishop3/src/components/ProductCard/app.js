import React from 'React';
import PropTypes from 'prop-types';
import './style.css'

class ProductCard extends React.Component {

    static propTypes = {
        product: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            picUrl: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired
        })
    };

    render() {
        const product = this.props.product;

        return(
            <table className="ProductCard">
               <tbody>
                   <tr>
                       <td>picture url</td><td>{product.picUrl}</td>
                   </tr>
                   <tr>
                       <td>name</td><td>{product.name}</td>
                   </tr>
                   <tr>
                       <td>price</td><td>{product.price}</td>
                   </tr>
                   <tr>
                       <td>balance</td><td>{product.balance}</td>
                   </tr>
               </tbody>
            </table>
        )
    }
}

export default ProductCard;