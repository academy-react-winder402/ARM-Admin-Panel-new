// ** React Imports
import { useState } from "react";

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardImg,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

const ProfileHeader = ({ data }) => {
  // ** States
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Card className="profile-header mb-2">
      <div
        style={{
          border: "0px",
          minHeight: "200px",
          borderBottom: "1px solid rgba(174,174,174,0.2)",
        }}
      ></div>
      <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          <div className="profile-img">
            <img
              className="rounded"
              src={
                data.currentPictureAddress == "Not-set"
                  ? "../../@core/assets/images/avatars/avatar-blank.png"
                  : data.currentPictureAddress
              }
              alt="Card image"
            />
          </div>
          <div className="profile-title ms-3">
            <h2 className="text-white">
              {data.fName ? data.fName : "وارد نشده"}
            </h2>
            <p className="text-white">
              {data.lName ? data.lName : "وارد نشده"}
            </p>
          </div>
        </div>
      </div>
      <div className="profile-header-nav">
        <Navbar
          container={false}
          className="justify-content-end justify-content-md-between w-100"
          expand="md"
          light
        >
          <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
              <Nav className="mb-0" pills>
                <NavItem>
                  <NavLink className="fw-bold" active>
                    <span className="d-none d-md-block">اطلاعات اولیه</span>
                    <Rss className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="fw-bold">
                    <span className="d-none d-md-block">دوره ها</span>
                    <Info className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
              <Button color="primary">
                <Edit className="d-block d-md-none" size={14} />
                <span className="fw-bold d-none d-md-block">Edit</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  );
};

export default ProfileHeader;
