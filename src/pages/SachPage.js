import React, { useState } from "react";
import SachForm from "../components/Sach/SachForm";
import SachList from "../components/Sach/SachList";

const SachPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <SachForm onAddSuccess={handleRefresh} />
      <SachList refresh={refresh} />
    </div>
  );
};

export default SachPage;
