import { useState } from "react";

import { Select, SingleSelect, type RawOptionObj } from "./Select";
import {
  CustomSelect,
  MOCK_USERS,
  UserId,
  // UserInfo,
  createUser,
} from "./CustomSelect";

import styles from "./App.module.css";

const OPTIONS: RawOptionObj<unknown, undefined>[] = [
  NaN,
  null,
  undefined,
  false,
  0,
  (a: number) => a + 1,
  window.navigator,
  "Disabled",
  "Vasya",
].map((v) => ({
  value: v,
  data: undefined,
  disabled: v === "Disabled",
}));

function App() {
  const [myValue, setMyValue] = useState([OPTIONS[0].value]);
  const [users, setUsers] = useState<UserId[]>([]);
  const [singleUser, setSingleUser] = useState<unknown>();

  return (
    <div className={styles.root}>
      <CustomSelect
        title={"Multi-select user"}
        placeholder="Select user"
        initialOptions={MOCK_USERS}
        value={users}
        onChange={setUsers}
        onAddNewOption={createUser}
      />

      <Select
        title={"Multi-select arbitrary value"}
        placeholder="Select value"
        initialOptions={OPTIONS}
        value={myValue}
        onChange={setMyValue}
        onAddNewOption={(value) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ value, data: undefined });
            }, 1500);
          });
        }}
      />

      <SingleSelect
        title={"Single-select arbitrary value"}
        placeholder="Select value"
        initialOptions={OPTIONS}
        value={singleUser}
        onChange={setSingleUser}
      />
    </div>
  );
}

export default App;
