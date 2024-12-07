import React, { useState } from "react";
import TacGiaForm from "../components/TacGia/TacGiaForm";
import TacGiaList from "../components/TacGia/TacGiaList";

const TacGiaPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <TacGiaForm onAddSuccess={handleRefresh} />
      <TacGiaList refresh={refresh} />
    </div>
  );
};

export default TacGiaPage;
