import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import { useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axiosInstance from '../../api/api';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.barcode}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.cost}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() =>console.log("clicked")}
          >
            <EditIcon fontSize='inherit'/>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body1" gutterBottom component="div">
                More Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Suplier</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell>{row.brandName}</TableCell>
                      <TableCell>{row.categoryName}</TableCell>
                      <TableCell>{row.suplierName}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    barcode: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const ProductList = () => {

  const [rows,setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    async function load(){

      const productResponse = await axiosInstance.get('api/products');
      const products = productResponse.data.products
      const categorieResponse = await axiosInstance.get('api/categories');
      const categories = categorieResponse.data.categories
      const brandResponse = await axiosInstance.get('api/brands');
      const brands = brandResponse.data.brands
      const suplierResponse = await axiosInstance.get('api/supliers');
      const supliers = suplierResponse.data.supliers

      const list = products.map(product=>{
        const category = categories.find(category => category.id === product.category_id);
        const brand = brands.find(brand => brand.id === product.brand_id);
        const suplier = supliers.find(suplier => suplier.id === product.suplier_id);

        return {
          ...product,
          categoryName: category ? category.name : 'Unknown Category',
          brandName: brand ? brand.name : 'Unknown brand',
          suplierName: suplier ? suplier.name : 'Unknown suplier',
        };
      })
 
      setRows(list)
      setIsLoading(false)
    }
    try{
      load()
    }catch(e){
      console.log(e.message)
      setIsLoading(false)
    } 
  }, [])

  return (
    <>
    {
      isLoading
      ?
        <Box sx={{textAlign:'center'}}>
          <LinearProgress color="teal" />
        </Box>
      :
      <TableContainer component={Paper}>
        <Table size='small' aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Barcode</TableCell>
              <TableCell align="right">Price&nbsp;(Rs)</TableCell>
              <TableCell align="right">Cost&nbsp;(Rs)</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
    </>
    
  );
}

export default ProductList