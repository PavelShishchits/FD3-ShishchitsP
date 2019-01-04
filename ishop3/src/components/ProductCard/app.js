import React from 'React';
import PropTypes from 'prop-types';
import './style.css'

class ProductCard extends React.Component {

    static defaultProps = {
        title: 'Product card'
    };

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picUrl: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired
        // editTable: PropTypes.boolean.isRequired
    };

    // state = {
    //     editable: this.props.editTable
    // };

    render() {

        return (
            <div className='ProductCard'>
                <div className="ProductCard__title">{this.props.title}</div>
                <div className='ProductCard__inner'>
                    <div className='ProductCard__row'>
                        <div className="ProductCard__name">picture url</div>
                        <div className="ProductCard__descr">{this.props.picUrl}</div>
                    </div>
                    <div className='ProductCard__row'>
                        <div className="ProductCard__name">name</div>
                        <div className="ProductCard__descr">{this.props.name}</div>
                    </div>
                    <div className='ProductCard__row'>
                        <div className="ProductCard__name">price</div>
                        <div className="ProductCard__descr">{this.props.price}</div>
                    </div>
                    <div className='ProductCard__row'>
                        <div className="ProductCard__name">balance</div>
                        <div className="ProductCard__descr">{this.props.balance}</div>
                    </div>
                </div>
            </div>
        )
        // return(
        //     {
        //         !this.state.editable
        //         ?
        //         <div className='ProductCard'>
        //             <div className="ProductCard__title">{this.props.title}</div>
        //             <div className='ProductCard__inner'>
        //                 <div className='ProductCard__row'>
        //                     <div className="ProductCard__name">picture url</div>
        //                     <div className="ProductCard__descr">{this.props.picUrl}</div>
        //                 </div>
        //                 <div className='ProductCard__row'>
        //                     <div className="ProductCard__name">name</div>
        //                     <div className="ProductCard__descr">{this.props.name}</div>
        //                 </div>
        //                 <div className='ProductCard__row'>
        //                     <div className="ProductCard__name">price</div>
        //                     <div className="ProductCard__descr">{this.props.price}</div>
        //                 </div>
        //                 <div className='ProductCard__row'>
        //                     <div className="ProductCard__name">balance</div>
        //                     <div className="ProductCard__descr">{this.props.balance}</div>
        //                 </div>
        //             </div>
        //         </div>
        //         :
        //         <div className='ProductCard'>
        //             <div className="ProductCard__title">{this.props.title}</div>
        //             <div className='ProductCard__inner'>
        //                 <div className='ProductCard__row'>
        //                     <div className="ProductCard__name">picture url</div>
        //                     <div className="ProductCard__descr">{this.props.picUrl}</div>
        //                 </div>
        //                 <div className='ProductCard__row'>
        //                     <div className="ProductCard__name">name</div>
        //                     <div className="ProductCard__descr">{this.props.name}</div>
        //                 </div>
        //                 <div className='ProductCard__row'>
        //                     <div className="ProductCard__name">price</div>
        //                     <div className="ProductCard__descr">{this.props.price}</div>
        //                 </div>
        //                 <div className='ProductCard__row'>
        //                     <div className="ProductCard__name">balance</div>
        //                     <div className="ProductCard__descr">{this.props.balance}</div>
        //                 </div>
        //             </div>
        //         </div>
        //     }
        //
        // )
    }
}

export default ProductCard;