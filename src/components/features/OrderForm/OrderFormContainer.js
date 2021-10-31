import { connect } from 'react-redux';
import OrderForm from './OrderForm';
import { getOrderOptions } from '../../../redux/orderRedux';

const mapStateProps = state => ({
  options: getOrderOptions(state),
});

export default connect(mapStateProps)(OrderForm);
