import Contact from '@uidu/contact';
import { Shell, ShellSlide } from '@uidu/widgets';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import Swiper from 'swiper';
import { DonateProps } from '../types';
import Confirmation from './steps/Confirmation';
import Donation from './steps/Donation';
import Pay from './steps/Pay';
import Preferences from './steps/Preferences';

export default function Donate({
  donation,
  currentMember,
  providers,
  baseUrl = '/',
  donation: propDonation,
  createDonation,
  updateDonation,
  createSubscription,
  updateSubscription,
  updateCurrentMember,
  embedded,
  ...rest
}: DonateProps) {
  const slider: React.RefObject<Swiper> = useRef(null);

  const slides: ShellSlide[] = [
    {
      key: 'donation',
      'data-history': 'donations',
      header: {
        to: baseUrl,
        name: (
          <FormattedMessage
            defaultMessage="Donate now"
            id="guidu.donate.donation.name"
          />
        ),
      },
      component: (
        <Donation
          {...rest}
          providers={providers}
          handleSubmit={async (model) =>
            createDonation(model).then(() => slider.current.slideNext())
          }
        />
      ),
    },
  ];

  slides.push({
    'data-history': 'preferences',
    key: 'preferences',
    header: {
      to: 'back',
      name: (
        <>
          <h5 className="m-0">{donation.amount}</h5>
          <span>Personalizza</span>
        </>
      ),
    },
    component: (
      <Preferences
        {...rest}
        currentMember={currentMember}
        donation={donation}
        handleSubmit={async (model) =>
          updateDonation(model).then(() => slider.current.slideNext())
        }
      />
    ),
  });

  slides.push({
    key: 'contact',
    'data-history': 'contact',
    header: {
      to: 'back',
      name: (
        <FormattedMessage
          defaultMessage="Contact information"
          id="guidu.donate.donation.contact"
        />
      ),
    },
    component: (
      <Contact
        {...rest}
        scope="donations"
        contact={currentMember}
        handleSubmit={async (model) => {
          return updateCurrentMember(model).then(() =>
            setTimeout(() => slider.current.slideNext(), 500),
          );
        }}
      />
    ),
  });

  slides.push({
    key: 'pay',
    'data-history': 'payments',
    header: {
      to: 'back',
      name: (
        <FormattedMessage
          defaultMessage="Donate now"
          id="guidu.donate.donation.payment"
        />
      ),
    },
    component: donation.amount ? (
      <Pay {...rest} provider={{ id: 'card' }} donation={donation} />
    ) : null,
  });

  slides.push({
    key: 'confirmation',
    'data-history': 'done',
    header: {
      to: baseUrl,
      name: (
        <FormattedMessage
          defaultMessage="Done!"
          id="guidu.donate.donation.done"
        />
      ),
    },
    component: <Confirmation {...rest} donation={donation} />,
  });

  return (
    <Shell
      slides={slides}
      ref={slider}
      baseUrl={baseUrl}
      scope="donations"
      embedded={embedded}
    />
  );
}
