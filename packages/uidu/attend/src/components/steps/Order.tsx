import FieldText from '@uidu/field-text';
import { Form, FormSectionSubmit } from '@uidu/form';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { calculateTotals } from '../../utils';
import Ticket from '../Ticket';

export default function Order({ event, handleSubmit }) {
  const [cart, setCart] = useState({});

  const handleCounterChange = (ticket, value) => {
    setCart({
      ...cart,
      [ticket.id]: {
        ticket,
        count: value,
      },
    });
  };

  const calculatedTotals = useCallback(cart => calculateTotals(cart), [cart]);

  return (
    <Form
      handleSubmit={handleSubmit}
      footerRenderer={({ canSubmit, loading }) => (
        <FormSectionSubmit
          scope="events"
          canSubmit={canSubmit}
          loading={loading}
          label={
            <FormattedMessage
              defaultMessage="Proceed"
              id="guidu.attend.order.submit"
            />
          }
        />
      )}
    >
      <FieldText type="hidden" name="kind" value="event" />
      <FieldText type="hidden" name="currency" value="eur" />
      <div className="list-group">
        {(event.tickets || []).map((ticket, index) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            index={index}
            handleCounterChange={handleCounterChange}
          />
        ))}
        <div className="list-group-item">
          <div className="d-flex">
            <div>
              Totale: {calculatedTotals(cart).total} biglietti per{' '}
              {calculatedTotals(cart).amount / 100} €
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
