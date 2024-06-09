// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Address from "./steps-with-validation/Address";
import SocialLinks from "./steps-with-validation/SocialLinks";
import PersonalInfo from "./steps-with-validation/PersonalInfo";
import FileUploder from "./steps-with-validation/FileUploder";

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const steps = [
    {
      id: "course-picture",
      title: "اضافه کردن عکس دوره",
      subtitle: "تصویر دوره را وارد کنید",
      content: <FileUploder stepper={stepper} />,
    },
    {
      id: "course-info",
      title: "اطلاعات دوره",
      subtitle: "اضافه کردن اطلاعات",
      content: <PersonalInfo stepper={stepper} />,
    },
    {
      id: "course-property",
      title: "ویژگی های دوره",
      subtitle: "ویژگی ها را وارد کنید",
      content: <Address stepper={stepper} />,
    },
    {
      id: "course-detail",
      title: "توضیحات دوره",
      subtitle: "توضیحات را وارد کنید",
      content: <SocialLinks stepper={stepper} />,
    },
  ];

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default WizardHorizontal;
