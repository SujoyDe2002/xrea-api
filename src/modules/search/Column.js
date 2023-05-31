export const columns = [
    {
      name: "Name",
      options: {
        filter: true,
        colspan: 2,
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            left: "0",
            background: "red",
            zIndex: 100,
   
         
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            left: 0,
            background: "red",
            zIndex: 101,
            
          }
        })
      }
    },
    {
      name: "Title",
      options: {
        filter: true,
        setCellProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Location",
      options: {
        filter: false,
        setCellProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
    {
      name: "Age",
      options: {
        filter: true
      }
    },
    {
      name: "Salary",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "Salary1",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "Salary2",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "Phone Number",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    }
  ];