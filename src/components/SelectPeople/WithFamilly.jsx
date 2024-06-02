import React from "react";
import "../../assets/css/WithFriend.css";
import { SelectPicker } from "rsuite";

function WithFamilly() {
  const data = Array.from({ length: 8 }, (_, i) => {
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
      <div style={{display:"flex" , flexDirection:"column"}}>
        <div style={{marginBottom:"20px"}}>
          How many familly members travel with you :
          <SelectPicker
            className="withfriends-selct"
            data={data}
            searchable={false}
            style={{ width: 224 , marginLeft:"23px" }}
            placeholder="Select without search"
            menuStyle={{ maxHeight: 200 }}
          />
        </div>
        <div>
          How many children members travel with you :
          <SelectPicker
            className="withfriends-selct"
            data={data}
            searchable={false}
            style={{ width: 224 }}
            placeholder="Select without search"
            menuStyle={{ maxHeight: 150 }}
          />
        </div>
      </div>
    </div>
  );
}

export default WithFamilly;
