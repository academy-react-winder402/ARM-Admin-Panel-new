// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, Card } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import CollapseFilter from './CollapseFilter'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <Row>

        <Col sm='12'>
        <Table />
        </Col>
      </Row>
    </div>
  )
}

export default UsersList
