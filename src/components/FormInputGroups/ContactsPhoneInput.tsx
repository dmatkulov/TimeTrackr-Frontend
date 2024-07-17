import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Col, Form } from 'antd';
import { UserMutation } from '../../types/types.user';

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
            {
              validator: (_, value) => {
                if (value && value.length > 3 && value.length !== 12) {
                  return Promise.reject('Введите номер полностью');
                }
                return Promise.resolve();
              },
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
            value={state.contactInfo?.mobile}
            onChange={onPhoneChange}
            inputClass="ant-input css-dev-only-do-not-override-1r287do ant-input-outlined"
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
