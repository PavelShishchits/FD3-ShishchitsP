import React from 'React';
import PropTypes from 'prop-types';
import './style.css'

class ProductCard extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picUrl: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired
    };

    render() {

        return(
            <table className="ProductCard">
               <tbody>
                   <tr>
                       <td>picture url</td><td>{this.props.picUrl}</td>
                   </tr>
                   <tr>
                       <td>name</td><td>{this.props.name}</td>
                   </tr>
                   <tr>
                       <td>price</td><td>{this.props.price}</td>
                   </tr>
                   <tr>
                       <td>balance</td><td>{this.props.balance}</td>
                   </tr>
               </tbody>
            </table>
        )
    }
}

export default ProductCard;