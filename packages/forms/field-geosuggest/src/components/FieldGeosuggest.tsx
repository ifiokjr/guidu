import { Wrapper } from '@uidu/field-base';
import classNames from 'classnames';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  RequestOptions,
  Suggestion,
} from 'use-places-autocomplete';
import { FieldGeosuggestProps } from '../types';
import FieldGeosuggestCurrentPosition from './FieldGeosuggestCurrentPosition';
import FieldGeosuggestItem from './FieldGeosuggestItem';

function FieldGeosuggest({
  onSuggestSelect = () => {},
  onGeocode,
  name,
  autoFocus,
  className,
  disabled,
  id,
  placeholder,
  required,
  geocoderType,
  bounds,
  countryRestricted,
  onSetValue,
  onChange,
  forwardedRef,
  geolocationEnabled = true,
  valueGetter,
  value: propValue,
  ...rest
}: FieldGeosuggestProps) {
  const element = useRef(null);
  const [activeSuggestion, setActiveSuggestion] = useState(null);

  useImperativeHandle(forwardedRef, () => element.current);

  const requestOptions: RequestOptions = {
    types: geocoderType || ['geocode', 'establishment'],
  };
  if (bounds) {
    requestOptions.bounds = bounds;
  }
  if (countryRestricted) {
    requestOptions.componentRestrictions = {
      country: countryRestricted,
    };
  }

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions,
    debounce: 300,
  });

  const [isGeolocationAvailable, setIsGeolocationAvailable] = useState(false);

  useEffect(() => {
    if (geolocationEnabled) {
      if (
        (window.location.protocol === 'https:' ||
          window.location.hostname === 'localhost') &&
        'geolocation' in navigator
      ) {
        setIsGeolocationAvailable(true);
      } else {
        setIsGeolocationAvailable(false);
      }
    }
    return () => null;
  }, []);

  useEffect(() => {
    setValue(propValue, false);
    return () => null;
  }, [propValue]);

  const activateSuggestion = (direction: string) => {
    const suggestsCount = data.length - 1;
    const next = direction === 'next';

    let newActiveSuggest = null;
    let newIndex = 0;
    let i = 0;

    for (i; i <= suggestsCount; i += 1) {
      if (data[i] === activeSuggestion) {
        newIndex = next ? i + 1 : i - 1;
      }
    }

    if (!activeSuggestion) {
      newIndex = next ? 0 : suggestsCount;
    }

    if (newIndex >= 0 && newIndex <= suggestsCount) {
      newActiveSuggest = data[newIndex];
    }

    setActiveSuggestion(newActiveSuggest);
  };

  const selectSuggestion = (suggestion: Suggestion) => {
    const {
      description,
      structured_formatting: { main_text, main_text_matched_substrings },
    } = suggestion;
    let value = description;
    if (valueGetter) {
      value = valueGetter(suggestion);
    }
    setValue(value, false);
    // formsy
    onSetValue(value);
    onChange(name, value, suggestion);
    // callbacks
    if (onGeocode) {
      geocodeSuggestion(suggestion);
    }
    clearSuggestions();
  };

  const geocodeSuggestion = ({ description }) => {
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(onGeocode)
      .catch((error) => {
        console.log('😱 Error: ', error);
      });
  };

  const onInputKeyDown = (event) => {
    switch (event.which) {
      case 40: // DOWN
        event.preventDefault();
        activateSuggestion('next');
        break;
      case 38: // UP
        event.preventDefault();
        activateSuggestion('prev');
        break;
      case 13: // ENTER
        event.preventDefault();
        selectSuggestion(activeSuggestion);
        break;
      case 9: // TAB
        selectSuggestion(activeSuggestion);
        break;
      case 27: // ESC
        clearSuggestions();
        break;
      default:
        break;
    }
  };

  const onInputFocus = () => {
    element.current.setSelectionRange(0, 9999);
  };

  const onInputChange = (e) => setValue(e.target.value);

  return (
    <Wrapper
      {...rest}
      rowClassName="position-relative"
      {...(isGeolocationAvailable
        ? {
            addonAfter: (
              <FieldGeosuggestCurrentPosition onGeocode={onGeocode} />
            ),
          }
        : {})}
      id={id}
    >
      <input
        className={classNames('form-control', className)}
        disabled={!ready || disabled}
        name={name}
        ref={element}
        type="search"
        id={id}
        value={value}
        autoComplete="off"
        autoFocus={autoFocus}
        placeholder={placeholder as string}
        onFocus={onInputFocus}
        onKeyDown={onInputKeyDown}
        onChange={onInputChange}
        required={required}
      />
      {status === 'OK' && (
        <ul className="dropdown-menu show">
          {data.map((suggestion) => {
            const isActive =
              activeSuggestion && suggestion.id === activeSuggestion.id;

            return (
              <FieldGeosuggestItem
                key={suggestion.id}
                suggestion={suggestion}
                isActive={isActive}
                onClick={selectSuggestion}
              />
            );
          })}
        </ul>
      )}
    </Wrapper>
  );
}

// class FieldGeosuggest extends PureComponent<any, any> {
//   componentDidMount() {
//     this.componentForm = {
//       street_number: 'short_name',
//       route: 'long_name',
//       locality: 'long_name',
//       administrative_area_level_1: 'short_name',
//       country: 'long_name',
//       postal_code: 'short_name',
//     };
//   }

//   parseGoogleResponse = components =>
//     components.reduce((acc, component) => {
//       const type = component.types[0];
//       acc[type] = {
//         long_name: component.long_name,
//         short_name: component.short_name,
//       };
//       return acc;
//     }, {});

//   getAddressFromCoordinates = (lat, lng) => {
//     const {
//       help,
//       onSetValue,
//       onChange,
//       onGeocode,
//       name,
//       formatAddressFromCoordinates,
//     } = this.props;
//     const latLng = new this.googleMaps.LatLng(lat, lng);
//     this.geocoder.geocode({ latLng }, (results, status) => {
//       if (status === this.googleMaps.GeocoderStatus.OK) {
//         if (results[1]) {
//           const value = formatAddressFromCoordinates(
//             this.parseGoogleResponse(results[0].address_components),
//           );
//           this.setState(
//             {
//               loading: false,
//               help,
//               value,
//             },
//             () => {
//               onSetValue(value);
//               onChange(name, value);
//               onGeocode({ lat, lng });
//             },
//           );
//         } else {
//           this.setState({
//             loading: false,
//             value: '',
//             help: 'No results found',
//           });
//         }
//       } else {
//         this.setState({
//           loading: false,
//           value: '',
//           help: `Geocoder failed due to: ${status}`,
//         });
//       }
//     });
//   };
// }

export default forwardRef((props: FieldGeosuggestProps, ref) => (
  <FieldGeosuggest {...props} forwardedRef={ref} />
));
