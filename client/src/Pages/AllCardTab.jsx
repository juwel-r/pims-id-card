import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AllCardData from "./AllCardData";
import ReceivedCard from "./AllCardTab/ReceivedCard";

const AllCardTab = () => {
  return (
    <Tabs defaultIndex={1} onSelect={(index) => console.log(index)}>
      <div className="flex justify-center">
        <TabList>
          <Tab>All Cards</Tab>
          <Tab>Received Application</Tab>
          <Tab>Sent PHQ</Tab>
          <Tab>Received From PHQ</Tab>
          <Tab>Delivered</Tab>
        </TabList>
      </div>

      <TabPanel>
        <AllCardData></AllCardData>
      </TabPanel>
      <TabPanel>
        <ReceivedCard/>
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

export default AllCardTab;
