import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../data/settings';
import Button from '../../common/Button/Button';

const sendOrder = (tripId, tripName, options, tripCost, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId,
    countryCode,
    tripName,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  // if (tripName.name === '' || tripName.contact === '') {
  //   alert('Please fill out the missing fields');
  //   return;
  // }

  fetch(url, fetchOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (parsedResponse) {
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({
  tripCost,
  options,
  setOrderOption,
  tripId,
  countryCode,
  tripName,
  tripDuration,
}) => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption
          {...option}
          setOrderOption={setOrderOption}
          currentValue={options[option.id]}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary
        tripCost={tripCost}
        options={options}
        tripDuration={tripDuration}
      />
      <Button
        onClick={() =>
          sendOrder(
            tripCost,
            options,
            setOrderOption,
            tripId,
            countryCode,
            tripName
          )
        }
      >
        Order now!
      </Button>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  pricing: PropTypes.array,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  countryCode: PropTypes.string,
  tripName: PropTypes.string,
  tripDuration: PropTypes.number,
};

export default OrderForm;
