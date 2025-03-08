import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { matchesList } from '../dummyData';
const MachesList = () => {
  const columns = [
    {
      field: 'team',
      headerName: 'Team',
      width: 150
    },
    {
      field: 'city',
      headerName: 'City',
      width: 100
    },
    {
      field: 'venue',
      headerName: 'Venue',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 110,
    },
    {
      field: 'format',
      headerName: 'Format',
      type: 'number',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 170,
      renderCell: () => {
          // console.log(params.row.img[0])
          return (
              <button className='btn btn-success' style={{ fontSize: "0.8rem", width: "100%" }}>Request Match</button>
          );
      },
  },
    

  ];

  return (
    <div className='properties-list' style={{
      backgroundColor: " white",
      padding: "20px",
      borderRadius: "20px",
      width: "100%",
    }}>
      <h4 style={{ color: "#374957" }}>Properties List</h4>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={matchesList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          getRowId={(row) => row.matchNumber}

        />
      </Box>
    </div>
  )
}

export default MachesList
