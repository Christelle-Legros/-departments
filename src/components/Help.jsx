import React, { useEffect, useState } from "react";
import axios from "axios";

const Help = () => {
  const [tab, setTab] = useState([]); // recupère le premier tableau de l'appel api

  useEffect(() => {
    async function fetchData() {
      await axios.get(`https://geo.api.gouv.fr/departements`).then((res) => {
        setTab(res.data);
        console.log(tab);
      });
    }
    fetchData();
  }, []);

  return (
    <div className="help">
      {tab.map((department) => (
        <div className="help__department" key={department.code}>
          {department.code} - {department.nom}
        </div>
      ))}
    </div>
  );
};

export default Help;
