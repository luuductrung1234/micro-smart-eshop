import { useState } from "react";
import { Drawer, Input, Col, Select, Form, Row, Button, Spin } from "antd";
import { addNewStudent, updateStudent } from "./client";
import { LoadingOutlined } from "@ant-design/icons";
import {
  errorNotification,
  requestErrorNotification,
  successNotification,
} from "../../shared/Notification";

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function StudentDrawerForm({
  showDrawer,
  setShowDrawer,
  studentToEdit,
  setStudentToEdit,
  fetchStudents,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [formState, setFormState] = useState([]);

  const onVisibleChange = () => {
    if (!showDrawer || !studentToEdit) return;
    setFormState([
      {
        name: ["id"],
        value: studentToEdit.id,
      },
      {
        name: ["name"],
        value: studentToEdit.name,
      },
      {
        name: ["email"],
        value: studentToEdit.email,
      },
      {
        name: ["gender"],
        value: studentToEdit.gender,
      },
    ]);
  };

  const onClear = () => {
    setFormState([
      {
        name: ["id"],
        value: null,
      },
      {
        name: ["name"],
        value: null,
      },
      {
        name: ["email"],
        value: null,
      },
      {
        name: ["gender"],
        value: null,
      },
    ]);
  };

  const onCLose = () => {
    setStudentToEdit(null);
    onClear();
    setShowDrawer(false);
  };

  const onFinish = (student) => {
    setSubmitting(true);
    console.log(JSON.stringify(student, null, 2));
    if (studentToEdit) {
      updateStudent(student)
        .then(() => {
          console.log("student updated");
          onCLose();
          successNotification(
            "Student updated",
            <span>
              <strong>{student.name}</strong> was updated on the system
            </span>
          );
          fetchStudents();
        })
        .catch(requestErrorNotification)
        .finally(() => {
          setSubmitting(false);
        });
      return;
    }
    addNewStudent(student)
      .then(() => {
        console.log("student added");
        onCLose();
        successNotification(
          "Student added",
          <span>
            <strong>{student.name}</strong> was added to the system
          </span>
        );
        fetchStudents();
      })
      .catch(requestErrorNotification)
      .finally(() => {
        setSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.error(JSON.stringify(errorInfo, null, 2));

    let errorFieldNames = errorInfo.errorFields
      .map((errorField) => errorField.name[0])
      .join(", ");

    errorNotification(
      "Invalid Information",
      <span>
        please review your input in: <strong>{errorFieldNames}</strong>
      </span>
    );
  };

  return (
    <Drawer
      title="Create new student"
      width={720}
      onClose={onCLose}
      visible={showDrawer}
      afterVisibleChange={onVisibleChange}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onCLose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        fields={formState}
        onFieldsChange={(_, allFields) => {
          setFormState(allFields);
        }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        hideRequiredMark
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="id" label="Id" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter student name" }]}
            >
              <Input placeholder="Please enter student name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter student email" },
              ]}
            >
              <Input placeholder="Please enter student email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="gender"
              rules={[{ required: true, message: "Please select a gender" }]}
            >
              <Select placeholder="Please select a gender">
                <Option value="MALE">MALE</Option>
                <Option value="FEMALE">FEMALE</Option>
                <Option value="OTHER">OTHER</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row>{submitting && <Spin indicator={antIcon} />}</Row>
      </Form>
    </Drawer>
  );
}

export default StudentDrawerForm;
