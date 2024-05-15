import React from 'react';
import { RegisterMutation } from '../../../../../types/types.user';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { Col, Form, Input } from 'antd';

interface Props {
  state: RegisterMutation;
  onPhoneChange: (value: string) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}
const ContactsInputGroup: React.FC<Props> = ({
  state,
  onPhoneChange,
  onInputChange,
  error = false,
}) => {
  let inputClass: string =
    'ant-input css-dev-only-do-not-override-1okl62o ant-input-outlined';

  if (
    (state.contactInfo.mobile.length > 2 &&
      state.contactInfo.mobile.length < 12) ||
    error
  ) {
    inputClass = inputClass + ' ant-input-status-error';
  }

  return (
    <>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Form.Item<RegisterMutation>
          label="Телефон"
          name={['contactInfo', 'mobile']}
          status={'error'}
          rules={[
            { required: true, message: 'Укажите номер телефона' },
            {
              len: 12,
              message: 'Введите номер полностью',
            },
          ]}
        >
          <PhoneInput
            containerClass={inputClass}
            country="kg"
            masks={{ kg: '(...) ..-..-..' }}
            onlyCountries={['kg']}
            containerStyle={{ width: '100%', height: '32px' }}
            disableDropdown
            countryCodeEditable={false}
            value={state.contactInfo.mobile}
            onChange={onPhoneChange}
            inputStyle={{
              border: 'none',
              width: '100%',
              height: '100%',
            }}
            inputProps={{
              name: 'mobile',
              required: true,
              placeholder: '222',
            }}
          />
        </Form.Item>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Form.Item<RegisterMutation>
          label="Город"
          name={['contactInfo', 'city']}
          rules={[{ required: true, message: 'Укажите город' }]}
        >
          <Input
            name="city"
            value={state.contactInfo.city}
            onChange={onInputChange}
            placeholder="Город проживания"
          />
        </Form.Item>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Form.Item<RegisterMutation>
          label="Улица"
          name={['contactInfo', 'street']}
          rules={[{ required: true, message: 'Укажите улицу' }]}
        >
          <Input
            name="street"
            onChange={onInputChange}
            value={state.contactInfo.street}
            placeholder="Улица"
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default ContactsInputGroup;
