import './App.css';
import {getAllStudents} from "./client";
import {useEffect, useState} from "react";
import {Breadcrumb, Col, Empty, Layout, Menu, Row, Space, Table} from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a><EditOutlined /></a>
                <a style={{color: "red"}}><DeleteOutlined /></a>
            </Space>
        ),
    }
]

function App() {
    // React Component state
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    // fetching data once the React Component is loaded
    useEffect(() => {
        getAllStudents().then(data => {
            setStudents(data);
            setFetching(false);
        });
    }, []);

    const renderLoading = () => (
        <Row type="flex" align="middle">
            <Col span={12} offset={11}>
                <div style={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <LoadingOutlined style={{fontSize: 54}} spin/>
                </div>
            </Col>
        </Row>
    );

    const renderStudents = () => {
        console.log("render students");
        if (fetching) {
            return renderLoading();
        }
        if (students.length < 0) {
            return <Empty/>;
        }
        return <Table dataSource={students} columns={columns}
                      bordered title={() => 'Students'} rowKey={(student) => student.id}
                      pagination={{pageSize: 10}} scroll={{y: 270}}/>
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined/>}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>}>
                        Option 2
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined/>}>
                        Files
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Students</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        {renderStudents()}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Demo ©2021 Created by Thomas</Footer>
            </Layout>
        </Layout>
    );
}

export default App;
