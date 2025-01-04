import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AllCardData from "./AllCardData";

const AllCard = () => {
  return (
    <Tabs defaultIndex={3} onSelect={(index) => console.log(index)}>
      <div className="flex justify-center">
        <TabList>
          <Tab>All Cards</Tab>
          <Tab>Application Received</Tab>
          <Tab>Sent PHQ</Tab>
          <Tab>Received From PHQ</Tab>
          <Tab>Delivered</Tab>
        </TabList>
      </div>

      <TabPanel>
        <AllCardData></AllCardData>
      </TabPanel>
      <TabPanel>
        <h2>Application</h2>
      </TabPanel>
      <TabPanel>
        <h2>Sent</h2>
      </TabPanel>
      <TabPanel>
        <h2>Received From PHQ</h2>
      </TabPanel>
      <TabPanel>
        <h2>Delivered</h2>
      </TabPanel>
    </Tabs>
  );
};

export default AllCard;
