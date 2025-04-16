import React from 'react'
import MatchesList from '../components/MatchesList'
import './myMatches.css'
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Sidebar from '../components/Sidebar/Siderbar';
const MyMatches = () => {
    return (
        <DashboardHeader>
            <Sidebar>

                <div className='match-list' style={{ padding: "20px", width: "100%",backgroundColor:"#f0f0f0",height:"100vh"}}>
                    
                    <div className='match-search-section container'>
                        <div className='search-section-a'>
                            <div>Apply Filter
                                <span><CiFilter /></span>
                            </div>
                            <div>Show Enteries
                                <div>10</div>
                            </div>
                        </div>
                        <div className='search-section-b'>
                            <input placeholder='Search'></input>
                            <button><CiSearch /></button>
                        </div>
                    </div>

                    <MatchesList />
                </div>
            </Sidebar>
        </DashboardHeader>
    )
}

export default MyMatches
