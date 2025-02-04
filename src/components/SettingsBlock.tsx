import {Tabs, Tab} from "@nextui-org/react";
import { EditTarget } from "./EditTarget";
import { EditAccounts } from "./EditAccounts";
import { EditCategories } from "./LoginEm/EditCategories";

export const SettingsBlock = () => {

  
  return (
    <div aria-label="Tabs" className="flex flex-col text-white p-4 md:px-8 md:pt-6 md:pb-0">
      <header className="text-2xl pb-4">Settings</header>
      <Tabs 
        fullWidth 
        className="animate-fadeIn" 
        aria-label="Edit Options" 
        color="primary"
        size="md"
      >
        <Tab key="Edit Target" aria-label="Edit Target" title="Targets">
          <EditTarget />
        </Tab>
        <Tab key="Edit Account" aria-label="Edit Account" title="Accounts">
          <EditAccounts />
        </Tab>
        <Tab key="Edit Categories" aria-label="Edit Categories" title="Categories">
          <EditCategories />
        </Tab>
      </Tabs>
  </div>
  )
}