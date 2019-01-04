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
        balance: PropTypes.number.isRequired,
        onProductEdit: PropTypes.func
    };

    submitForm = (e) => {
        e.preventDefault();
        console.log(e);
        this.props.onProductEdit(this.state);
    };

    inputHandler = (e) => {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        });
    };

    state = {
        id: this.props.id,
        picUrl: '',
        name: '',
        price: '',
        balance: ''
    };

    render() {
        // console.log(this.props);
        return (
            this.props.editable
            ?
            <form className='ProductCard' onSubmit={this.submitForm}>
                <div className='ProductCard__title'>{this.props.title}</div>
                <div className='ProductCard__inner'>
                    <div className='ProductCard__row'>
                        <div className='ProductCard__name'>picture url</div>
                        <div className='ProductCard__descr'>
                            <input type='text' value={this.state.picUrl} onChange={this.inputHandler} name='picUrl' required/>
                        </div>
                    </div>
                    <div className='ProductCard__row'>
                        <div className='ProductCard__name'>name</div>
                        <div className='ProductCard__descr'>
                            <input type='text' value={this.state.name} onChange={this.inputHandler} name='name' required/>
                        </div>
                    </div>
                    <div className='ProductCard__row'>
                        <div className='ProductCard__name'>price</div>
                        <div className='ProductCard__descr'>
                            <input type='number' value={this.state.price} onChange={this.inputHandler} name='price' required/>
                        </div>
                    </div>
                    <div className='ProductCard__row'>
                        <div className='ProductCard__name'>balance</div>
                        <div className='ProductCard__descr'>
                            <input type='number' value={this.state.balance} onChange={this.inputHandler} name='balance' required/>
                        </div>
                    </div>
                    <div className='ProductCard__btn-wrap'>
                        <button type='submit' className='btn edit-btn'>Save</button>
                        <button className='btn delete-btn-btn'>Cancel</button>
                    </div>
                </div>
            </form>
            :
            <div className='ProductCard'>
                <div className='ProductCard__title'>{this.props.title}</div>
                <div className='ProductCard__inner'>
                    <div className='ProductCard__row'>
                        <div className='ProductCard__name'>picture url</div>
                        <div className='ProductCard__descr'>{this.props.picUrl}</div>
                    </div>
                    <div className='ProductCard__row'>
                        <div className='ProductCard__name'>name</div>
                        <div className='ProductCard__descr'>{this.props.name}</div>
                    </div>
                    <div className='ProductCard__row'>
                        <div className='ProductCard__name'>price</div>
                        <div className='ProductCard__descr'>{this.props.price}</div>
                    </div>
                    <div className='ProductCard__row'>
                        <div className='ProductCard__name'>balance</div>
                        <div className='ProductCard__descr'>{this.props.balance}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCard;