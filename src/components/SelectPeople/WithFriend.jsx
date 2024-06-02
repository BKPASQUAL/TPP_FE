import React from "react";
import "../../assets/css/WithFriend.css";
import { SelectPicker } from "rsuite";

function WithFriend() {
  const data = Array.from({ length: 20 }, (_, i) => {
    const value = i + 1;
    return { label: value.toString(), value };
  });

//   const data = [
//     "One", "Two", "Three", "Four", "Five",
//     "Six", "Seven", "Eight", "Nine", "Ten",
//     "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
//     "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"
//   ].map(item => ({ label: item, value: item }));
  return (
    <div className="withfriends-main">
      How Many Friends Travel With You :
      <SelectPicker
        className="withfriends-selct"
        data={data}
        searchable={false}
        style={{ width: 224 }}
        placeholder="Select without search"
        menuStyle={{ maxHeight: 200 }} 
      />
    </div>
  );
}

export default WithFriend;
