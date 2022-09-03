import { useContext, useEffect, useState } from "react";
import classes from "./House.module.css";

import AuthContext from "../../context/auth-context";
import Card from "../../shared/Card";
import {
  getDevices,
  getEnvironment,
  updateDevices,
} from "../../services/userService";
import Button from "../../shared/Button";

const House = () => {
  const context = useContext(AuthContext);
  const [deviceList, setDevices] = useState([]);
  const [sensorList, setSensors] = useState([]);

  const turnOnHandler = (deviceName) => {
    updateDevices(context.storedUserId, deviceName, true).then(() => {
      onReload();
    });
  };

  const turnOffHandler = (deviceName) => {
    updateDevices(context.storedUserId, deviceName, false).then(() => {
      onReload();
    });
  };

  const onReload = () => {
    getDevices(context.storedUserId).then((data) => {
      let devices = data.split(";");
      setDevices(
        devices.map((device) => {
          let deviceInfo = device.split(":");
          let deviceName = deviceInfo[0];
          let deviceValue = deviceInfo[1];
          return (
            <div key={deviceName} className={classes.device}>
              <p className={classes.deviceName}>{deviceName}</p>
              {deviceValue === "true" && (
                <Button
                  className={classes.btn}
                  onClick={() => {
                    turnOffHandler(deviceName);
                  }}
                >
                  Turn Off
                </Button>
              )}
              {deviceValue === "false" && (
                <Button
                  className={classes.deviceBtn}
                  onClick={() => {
                    turnOnHandler(deviceName);
                  }}
                >
                  Turn On
                </Button>
              )}
            </div>
          );
        })
      );
    });

    getEnvironment(context.storedUserId).then((data) => {
      let sensors = data.split(";");
      setSensors(
        sensors.map((sensor) => {
          let sensorInfo = sensor.split(":");
          let sensorName = sensorInfo[0];
          let sensorValue = sensorInfo[1];
          return (
            <div key={sensorName} className={classes.sensor}>
              <p className={classes.sensorName}>{sensorName}</p>
              <p className={classes.sensorValue}>{sensorValue}</p>
            </div>
          );
        })
      );
    });
  };

  useEffect(() => {
    onReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={classes.house}>
      <h2>Facility</h2>
      {deviceList}
      <h2>Sensors</h2>
      {sensorList}
    </Card>
  );
};

export default House;
