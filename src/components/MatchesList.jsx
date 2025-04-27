import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const MatchesList = ({ endpoint }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'team', headerName: 'Team', width: 140 },
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'venue', headerName: 'Venue', width: 110 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'format', headerName: 'Format', width: 100 },
    { field: 'matchType', headerName: 'Match Type', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 170,
      renderCell: () => (
        <button className='btn btn-success' style={{ fontSize: "0.8rem", width: "100%" }}>
          Request Match
        </button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(endpoint); 
        const dataWithIds = res.data.map((item, index) => ({
          id: index,
          ...item
        }));
        setMatches(dataWithIds);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <div className='properties-list' style={{
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "20px",
      width: "100%",
    }}>
      <h4 style={{ color: "#374957" }}>Matches List</h4>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={matches}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default MatchesList;
