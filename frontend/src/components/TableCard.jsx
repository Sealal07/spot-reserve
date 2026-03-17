import React from 'react'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'

export const TableCard = ({spot}) => {
    const text = 'hello'
  return (
    <>
    <CCard style={{ width: '18rem' }}>
      {/* <CCardImage orientation="top" alt='photo' /> */}
      <CCardBody>
        <CCardTitle>Стол №{spot.number}</CCardTitle>
        <CCardText>{spot.description}</CCardText>
        <CButton color="primary" href="#">{spot.isActive? "Забронировать": "Место занято"}</CButton>
      </CCardBody>
    </CCard>
    </>
  );
}

export default TableCard;

