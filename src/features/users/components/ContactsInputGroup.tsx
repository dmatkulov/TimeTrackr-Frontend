import React from 'react';
import { Col, Form, Input } from 'antd';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { RegisterMutation } from '../../../types/types.user';

interface Props {
  state: RegisterMutation;
  onPhoneChange: (value: string) => void;
}
const ContactsInputGroup: React.FC<Props> = ({ onPhoneChange, state }) => {
  return (
    <>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Form.Item
          label="Телефон"
          name={['contactInfo', 'mobile']}
          rules={[
            {
              required: true,
              message: 'Укажите номер телефона',
            },
            {
              min: 12,
              message: 'Введите номер полностью',
            },
          ]}
        >
          <PhoneInput
            country="kg"
            masks={{ kg: '(...) ..-..-..' }}
            onlyCountries={['kg']}
            containerStyle={{ width: '100%', height: '32px' }}
            disableDropdown
            countryCodeEditable={false}
            value={state.contactInfo.mobile}
            onChange={onPhoneChange}
            inputStyle={{
              width: '100%',
              height: '100%',
              paddingLeft: '8px',
              borderColor: 'red',
            }}
            inputProps={{
              name: 'mobile',
              required: true,
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
          <Input name="city" placeholder="Город проживания" />
        </Form.Item>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Form.Item<RegisterMutation>
          label="Улица"
          name={['contactInfo', 'street']}
          rules={[{ required: true, message: 'Укажите улицу' }]}
        >
          <Input name="street" placeholder="Улица" />
        </Form.Item>
      </Col>
    </>
  );
};

export default ContactsInputGroup;
