import React from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { Col, Form } from 'antd';
import { UserMutation } from '../../../types/types.user';

interface Props {
  state: UserMutation;
  onPhoneChange: (value: string) => void;
}
const ContactsPhoneInput: React.FC<Props> = ({ state, onPhoneChange }) => {
  return (
    <>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Form.Item
          label="Телефон"
          name={['contactInfo', 'mobile']}
          rules={[
            { required: true, message: 'Укажите номер телефона' },
            {
              len: 12,
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
            }}
            inputProps={{
              name: 'mobile',
              required: true,
            }}
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default ContactsPhoneInput;
