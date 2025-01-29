import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AllCardData from "./AllCardData";
import ApplicationReceive from "./AllCardTab/ApplicationReceive";
import SentPHQ from "./AllCardTab/SentPHQ";
import ReceiveCard from "./AllCardTab/ReceiveCard";
import DeliveredCards from "./AllCardTab/DeliveredCards";

const AllCardTab = () => {
  return (
    <Tabs defaultIndex={1} onSelect={(index) => console.log(index)}>
      <div className="flex justify-center">
        <TabList>
          <Tab>All Cards</Tab>
          <Tab>Received Application</Tab>
          <Tab>Sent PHQ</Tab>
          <Tab>Received ID Card From PHQ</Tab>
          <Tab>Delivered</Tab>
        </TabList>
      </div>

      <TabPanel>
        <AllCardData></AllCardData>
      </TabPanel>
      <TabPanel>
        <ApplicationReceive></ApplicationReceive>
      </TabPanel>
      <TabPanel>
        <SentPHQ></SentPHQ>
      </TabPanel>
      <TabPanel>
        <ReceiveCard></ReceiveCard>
      </TabPanel>
      <TabPanel>
        <DeliveredCards></DeliveredCards>
      </TabPanel>
    </Tabs>
  );
};

export default AllCardTab;
