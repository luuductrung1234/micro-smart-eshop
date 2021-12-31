import { notification } from "antd";
import {
  AntCloudOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const openNotificationWithIcon = (type, message, description, icon) =>
  notification[type]({ message, description, icon });

const openNotificationWithoutIcon = (type, message, description) =>
  notification[type]({ message, description });

export const successNotification = (message, description) =>
  openNotificationWithIcon(
    "success",
    message,
    description,
    <CheckCircleOutlined style={{ color: "#237804" }} />
  );

export const deleteNotification = (message, description) =>
  openNotificationWithIcon(
    "success",
    message,
    description,
    <DeleteOutlined style={{ color: "#595959" }} />
  );

export const errorNotification = (message, description) =>
  openNotificationWithIcon(
    "error",
    message,
    description,
    <CloseCircleOutlined style={{ color: "#a8071a" }} />
  );

export const infoNotification = (message, description) =>
  openNotificationWithIcon(
    "info",
    message,
    description,
    <InfoCircleOutlined style={{ color: "#0050b3" }} />
  );

export const warningNotification = (message, description) =>
  openNotificationWithIcon(
    "warning",
    message,
    description,
    <WarningOutlined style={{ color: "#ad6800" }} />
  );

export const requestErrorNotification = (err) => {
  err.response
    .json()
    .then((res) => {
      console.error(res);
      openNotificationWithIcon(
        "error",
        "There was an issue!",
        res.message,
        <AntCloudOutlined style={{ color: "#a8071a" }} />
      );
    })
    .catch((res) => {
      console.error(res);
      openNotificationWithIcon(
        "error",
        "Something went wrong!",
        "Server can not be reached...",
        <AntCloudOutlined style={{ color: "#a8071a" }} />
      );
    });
};
