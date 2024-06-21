// ** React Imports
import { useState } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = () => {
  // ** Store Vars
  const store = {fullName:'محسن مرتضی زاده', email:'mohsen@gmail.com', status:'فعال', role:'ادمین', nationalCode:'2354156987', contact:'09112345685' }

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={store.selectedUser} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  )
}
export default UserView
