import { Fragment, useRef, useState } from "react";
import Breadcrumbs from "../../@core/components/articless/Breadcrumbs";
import NewsList from "../../@core/components/articless/NewsList";
import ActiveTable from "../../@core/components/articless/ActiveTable";
import DeActiveTable from "../../@core/components/articless/DeActiveTable.js";

import Wizard from "@components/wizard";

function ListOfNews() {
  const [stepper, setStepper] = useState(null);
  const ref = useRef(null);
  const steps = [
    {
      id: "ActiveTable",
      content: <ActiveTable stepper={stepper} />,
    },
    {
      id: "DeActiveTable",
      content: <DeActiveTable stepper={stepper} />,
    },
  ];
  return (
    <Fragment>
      <Breadcrumbs
        title="لیست اخبار هگزا اسکواد"
        desc1="داشبورد"
        desc2="لیست اخبار"
      />
      <NewsList />
      <Wizard
        ref={ref}
        steps={steps}
        className="checkout-tab-steps"
        instance={(el) => setStepper(el)}
        options={{
          linear: false,
        }}
      />
      {/* <ActiveTable /> */}
    </Fragment>
  );
}

export default ListOfNews;
