import MUIDataTable from 'mui-datatables'
import { React, useRef, useLayoutEffect } from 'react'
import { columns } from './Column'
import data from './TestData'
import { createTheme, styled, useTheme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { Box } from '@mui/material';


const Demo = () => {

  const dataTableParentRef = useRef();
  useLayoutEffect(() => {
    //  console.log("dataTableParentRef", dataTableParentRef.current.firstChild);
    //  console.log("dataTableParentRef", dataTableParentRef);
    console.log("dataTableParentRef", dataTableParentRef.current.firstChild.children[2].style.overflowX = "scroll");

  }, [])
  const options = {
    responsive: "standard",
    fixedSelectColumn: false,

    //tableBodyHeight: "400px",
    pagination: false,
    selectableRowsHideCheckboxes: true,
    display: false,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log("rowData", rowData);
      return (
        <tr>
          <td colSpan={4}>
            <TableContainer>
              <Table style={{ margin: "0 auto" }}>
                <TableHead>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Color</TableCell>
                </TableHead>
                <TableBody>
                  {rowData[3].map((row) => {
                    console.log(row);
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row" align="right">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.color}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </td>
        </tr>
      );
    }


  };
  const tableBodyStyle = () =>
    createTheme({
      components: {
        MuiTable: {
          styleOverrides: {
            root: {
              padding: '8px',
              backgroundColor: '#CDCAC6',
            }
          }
        }
        // MuiTableCell: {
        //   styleOverrides: {
        //     root: {
        //       padding: '8px',
        //       backgroundColor: '#CDCAC6',
        //     }
        //   }
        // },
        // MuiToolbar: {
        //   styleOverrides: {
        //     regular: {
        //       minHeight: '8px',
        //     }
        //   }
        // }
      }
    });
  const test = {
    width: "100%",
    // "& .tss-0:has(table)": {
    //   overflowX: "scroll",
    //   backgroundColor: "red"
    // }
    // "& .tss-0:nth-child(2)": {
    //   overflowX: "scroll",
    //   backgroundColor: "red"
    // }
    "& *::-webkit-scrollbar": {
      height: "4px",
      width: "4px"
    },
    "& *::-webkit-scrollbar-track": {
      backgroundColor: "#F1F1F1"
    },
    "& *::-webkit-scrollbar-thumb": {
      backgroundColor: "#C1C1C1"
    }

  }


  return (
    // <ThemeProvider theme={tableBodyStyle()}>
    <Box ref={dataTableParentRef} sx={test}>

      <MUIDataTable
        data={data}
        pagination={false}
        columns={columns}
        options={options}
      />
    </Box>
    // </ThemeProvider>
  )
}

export default Demo