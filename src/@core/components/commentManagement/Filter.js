// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Filter = () => {

  // ** User filter options
  const roleOptions = [
    { value: '', label: 'Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'author', label: 'Author' },
    { value: 'editor', label: 'Editor' },
    { value: 'maintainer', label: 'Maintainer' },
    { value: 'subscriber', label: 'Subscriber' }
  ]

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'basic', label: 'Basic' },
    { value: 'company', label: 'Company' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'team', label: 'Team' }
  ]

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 }
  ]

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>Role</Label>
              <Select
                isClearable={false}
                // value={currentRole}
                options={roleOptions}
                className='react-select'
                classNamePrefix='select'
                // theme={selectThemeColors}
                // onChange={data => {
                //   setCurrentRole(data)
                //   dispatch(
                //     getData({
                //       sort,
                //       sortColumn,
                //       q: searchTerm,
                //       role: data.value,
                //       page: currentPage,
                //       perPage: rowsPerPage,
                //       status: currentStatus.value,
                //       currentPlan: currentPlan.value
                //     })
                //   )
                // }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>Plan</Label>
              <Select
                // theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={planOptions}
                // value={currentPlan}
                // onChange={data => {
                //   setCurrentPlan(data)
                //   dispatch(
                //     getData({
                //       sort,
                //       sortColumn,
                //       q: searchTerm,
                //       page: currentPage,
                //       perPage: rowsPerPage,
                //       role: currentRole.value,
                //       currentPlan: data.value,
                //       status: currentStatus.value
                //     })
                //   )
                // }}
              />
            </Col>
            <Col md='4'>
              <Label for='status-select'>Status</Label>
              <Select
                // theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                // value={currentStatus}
                // onChange={data => {
                //   setCurrentStatus(data)
                //   dispatch(
                //     getData({
                //       sort,
                //       sortColumn,
                //       q: searchTerm,
                //       page: currentPage,
                //       status: data.value,
                //       perPage: rowsPerPage,
                //       role: currentRole.value,
                //       currentPlan: currentPlan.value
                //     })
                //   )
                // }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Filter
