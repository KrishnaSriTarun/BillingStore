import { useEffect, useState } from 'react';
import './Dashboard.css'
import { fetchDashboardData } from './../../Service/Dashboard';
import toast from 'react-hot-toast';
function Dashboard() {

      const [data,setData]=useState(null);
      const [loading,setLoading]=useState(true);

      useEffect(()=>{
            const loadData=async()=>{
                  try{
                        const response=await fetchDashboardData();
                        setData(response.data);
                  }
                  catch(error){
                        console.error(error);
                        toast.error("Unable to view the data")
                  }
                  finally{
                        setLoading(false)
                  }
            }
            loadData();
      },[])

      if(loading){
            return <div className="loading">Loading dashboard...</div>
      }
      if(!data){
            return <div className="error">Failed to load the dashboard data...</div>
      }

      return (
            <div>Dashboard</div>
      );
}

export default Dashboard;