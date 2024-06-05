import { Fragment } from 'react'

import Breadcrumbs from '@components/breadcrumbs'
import { Card, CardHeader, CardTitle, CardBody, CardText, Input, Label, Row, Col, Button } from 'reactstrap'

import FileUploaderMultiple from '../../@core/components/File Uploader/FileUploaderMultiple'

const AddNews = () => {
  return (
    <Fragment>
        <Breadcrumbs title='ایجاد خبر جدید' data={[{ title: 'لیست اخبار' }, { title: 'ایجاد خبر جدید' }]} />
        <Card>
            <CardBody>
                <Row>
                    <Col sm='6' className='mb-1'>
                        <Label className='form-label mb-1' for='input-default'>
                            عنوان
                        </Label>
                        <Input className=' mb-1' type='text' id='input-default' placeholder='عنوان را وارد کنید' />
                        <Label className='form-label mb-1' for='input-default'>
                            توضیح کوتاه
                        </Label>
                        <Input className=' mb-1' type='text' id='input-default' placeholder='توضیح کوتاه را وارد کنید' />
                        <Label className='form-label mb-1' for='input-default'>
                            Google Title
                        </Label>
                        <Input className=' mb-1' type='text' id='input-default' placeholder='google title  را وارد کنید' />
                    </Col>
                    
                    <Col sm='6' className='mb-1'>
                        <Label className='form-label mb-1' for='input-default'>
                            دسته بندی 
                        </Label>
                        <Input className=' mb-1' type='text' id='input-default' placeholder='اخبار پژوهشگاه' />
                        <Label className='form-label mb-1' for='input-default'>
                            کلمات کلیدی
                        </Label>
                        <Input className=' mb-1' type='text' id='input-default' placeholder='کلمات کلیدی را وارد کنید' />
                        <Label className='form-label mb-1' for='input-default'>
                            Google Describe
                        </Label>
                        <Input className=' mb-1' type='text' id='input-default' placeholder='Google Describe را وارد کنید' />
                    </Col>

                    <Col sm="12">
                        <Label className='form-label mb-1' for='exampleText'>
                                متن بلاگ
                        </Label>
                    <Input className='mb-2' type='textarea' name='text' id='exampleText' rows='3' placeholder='توضیحات را وارد کنید' />
                    </Col>

                    <Col sm="12">
                        <FileUploaderMultiple/>
                    </Col>

                    <Col className='demo-inline-spacing'>
                        <Button.Ripple color='primary'>ثبت تغییرات</Button.Ripple>
                        <Button.Ripple color='dark' outline>لغو</Button.Ripple>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </Fragment>
  )
}

export default AddNews