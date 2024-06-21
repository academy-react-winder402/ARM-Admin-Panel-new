import { useState } from 'react'
import { Collapse, Button, Card, CardHeader } from 'reactstrap'

import collapseImg from '@src/assets/images/slider/04.jpg'
import Filter from './Filter'

const CollapseFilter = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Button className='mb-2' color='primary' onClick={toggle}>
        فیلتر
      </Button>
      <Collapse isOpen={isOpen}>
      <Filter/>
      </Collapse>
    </div>
  )
}

export default CollapseFilter