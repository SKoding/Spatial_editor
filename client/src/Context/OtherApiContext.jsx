import React, { createContext, useState, useEffect} from "react";
import axios from "axios";

const OtherApiContext = createContext();

const OtherProvider = ({ children }) => {
    const [kapTea, setKapTea] = useState();
    const [kapFeat, setKapFeat] = useState();
    const [taiTea, setTaiTea] = useState();
    const [taiFeat, setTaiFeat] = useState();
    const [mokTea, setMokTea] = useState();
    const [mokFeat, setMokFeat] = useState();

    useEffect(() => {
        const data1 = async () => {
          const kapRes = await axios.get(
            "http://localhost:8000/api/v1/KapTea/"
          );
          setKapTea(kapRes.data);
          //setAreaName(result.data);
        };
        data1();
      }, []);

      useEffect(() => {
        const data2 = async () => {
          const kapFRes = await axios.get(
            "http://localhost:8000/api/v1/KapFeat/"
          );
          setKapFeat(kapFRes.data);
          //setAreaName(result.data);
        };
        data2();
      }, []);

      useEffect(() => {
        const data3 = async () => {
          const taiRes = await axios.get(
            "http://localhost:8000/api/v1/taiTea/"
          );
          setTaiTea(taiRes.data);
          //setAreaName(result.data);
        };
        data3();
      }, []);

      useEffect(() => {
        const data4 = async () => {
          const taiFRes = await axios.get(
            "http://localhost:8000/api/v1/taiFeat/"
          );
          setTaiFeat(taiFRes.data);
          //setAreaName(result.data);
        };
        data4();
      }, []);

      useEffect(() => {
        const data5 = async () => {
          const mokRes = await axios.get(
            "http://localhost:8000/api/v1/mokTea/"
          );
          setMokTea(mokRes.data);
          //setAreaName(result.data);
        };
        data5();
      }, []);

      useEffect(() => {
        const data6 = async () => {
          const mokFRes = await axios.get(
            "http://localhost:8000/api/v1/mokFeat/"
          );
          setMokFeat(mokFRes.data);
          //setAreaName(result.data);
        };
        data6();
      }, []);

      return(
        <OtherApiContext.Provider value={ {kapTea, kapFeat, taiTea, taiFeat, mokTea, mokFeat}}>
            {children}
        </OtherApiContext.Provider>
      );
};

export {OtherProvider, OtherApiContext};