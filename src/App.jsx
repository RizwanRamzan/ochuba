import './App.css'
import { ConfigProvider } from 'antd'
import HomeAuthRoutes from './Routes/home';
import Layout from './Component/Layout/Layout';

function App() {
  const antdConfiguration = {
    token: {
      fontFamily: "Nunito Sans",
      colorPrimary: "#0094D9",
      colorLink: "#3d8aff",
      controlOutline: "#d4cfcc",
      colorText: "#1d1e25",
      colorTextBase: "#1d1e25",
      borderRadius: "7px",
      colorBorder: "#d4cfcc",
    },
  };



  return (
    <ConfigProvider theme={antdConfiguration}>
      <Layout>
        <HomeAuthRoutes />
      </Layout>
    </ConfigProvider>
  )
}

export default App

