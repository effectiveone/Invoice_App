import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../../Store/Actions/settingsActions';
import { useUser } from '../../Hook/useUser';
const TemplateCheckbox = () => {
  const { currentUser } = useUser();
  const dispatch = useDispatch();

  const selectedOption = useSelector(
    (state) => state?.settings?.settings?.templateInvoice,
  );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '50px',
        }}
      >
        {' '}
        <label>
          <input
            type='radio'
            name='option'
            value='basicInput'
            checked={selectedOption === 'basicInput'}
            onChange={() =>
              dispatch(
                updateSettings(
                  {
                    templateInvoice: 'basicInput',
                    email: currentUser.mail,
                  },
                  currentUser,
                ),
              )
            }
          />
          Basic Input
        </label>
        <label>
          <input
            type='radio'
            name='option'
            value='mediumInput'
            checked={selectedOption === 'mediumInput'}
            onChange={() =>
              dispatch(
                updateSettings(
                  {
                    templateInvoice: 'mediumInput',
                    email: currentUser.mail,
                  },
                  currentUser,
                ),
              )
            }
          />
          Medium Input
        </label>
        <label>
          <input
            type='radio'
            name='option'
            value='printerInput'
            checked={selectedOption === 'printerInput'}
            onChange={() =>
              dispatch(
                updateSettings(
                  {
                    templateInvoice: 'printerInput',
                    email: currentUser.mail,
                  },
                  currentUser,
                ),
              )
            }
          />
          Printer Input
        </label>
      </div>
    </div>
  );
};

export default TemplateCheckbox;
